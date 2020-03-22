/* globals gauge*/
"use strict";
const { 
    clearIntercept,
    intercept, openBrowser, write, 
    closeBrowser, goto, press, text, 
    below, focus,textBox, click, waitFor} = require('taiko');

const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const JIRA_APP = process.env.JIRA_APP || 'localhost:4200';
const CHROME_HOST = process.env.CHROME_HOST;
const CHROME_PORT = process.env.CHROME_PORT;

beforeSuite(async () => {
    await openBrowser({
        host: CHROME_HOST,
        port: CHROME_PORT,
        headless: headless,
        args: [
            '--auto-open-devtools-for-tabs',
            '--window-size=1440,900',
            '--no-sandbox']});
});

afterSuite(async () => {
    //await closeBrowser();
});

beforeScenario( async () => { 
    clearIntercept();
});

step("Products are <products>", async (products) => {

    let body = products.split(",").map(p => {
        return {name:p}; });

    await intercept(
        "/api/products$", 
        {body});

});

step("Goto products page", async () => {
    await goto(JIRA_APP);
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(content).exists());
});

step("<product> has the velocity <velocity> ps/sprint", 
    async (product, velocity) => {

    await intercept(
        `/api/products/${product}/features/done`, 
        {body: `{"velocity":${velocity}}`});

});

step("<product> got the velocity <velocity> ps/sprint", 
    async function(product, velocity) {

    assert.ok(
        await text(`${velocity}`, below(`${product}`)).exists());

});

step("<product> has <query> stories", async function(product,query) {

    await intercept("/api/query",(request) => {

        let data = JSON.parse(
            request.request.postData);

        if (data.query == query && 
            data.product == product &&
            request.request.method == "POST") {

            const res = {issues:[
                {key: `${product}-1`,
                 fields:{
                    summary:`${product} 1`,
                    status:{name:"Open"}}}
            ]};

            request.respond({body:res});
            return;

        }
        
        request.respond({body:{issues:[]}});
    })

});

step("Go to <product> search page", async function(product) {
    await goto(`${JIRA_APP}/products/${product}/search`);
});

step("Search for <query>", async function(query) {

    await focus(textBox());
    await write(query);
    await press("Enter");
    
});

step("<title> story found and it is <status>", async function(title, status) {

    assert.ok( await text(title).exists() );
    assert.ok( await text(status).exists() );

});

step("Nothing has been found", async function() {
    assert.ok( await text("nothing").exists() );
});

step("Go to <product> releases page", async function(product) {

    await click( `${product}` );
    await text( "Releases" );

    await goto(
        `${JIRA_APP}/products/${product}/releases`);

});

let releases_spec = {
    releases:{}
};

step("<product> epic <epic> in <release> has stories <table>", 
    async function(
        product, epic, release, table) {

    let stories = table.rows.map(r => r.cells[0]);

    await intercept("/api/stories",(request) => {

        let data = JSON.parse(
            request.request.postData);

        if (data.epic == epic && 
            data.product == product &&
            data.release == release &&
            request.request.method == "POST") {

            let issues = stories.map( s => {
                return {fields: {
                    summary: s,
                    status: {name: "Open"}
                }};
            });

            let body = {issues};
            request.respond({body});

            return;
        }

        request.respond({body:{issues:[]}});
    })

});

step("Go to <epic> stories page", async function(epic) {
    
    await click(epic);
    await text("Stories");

    await goto(
        `${JIRA_APP}/products/${the_product}/releases/${the_version}/epics/${epic}/stories`);

});

step("Stories should be those <table>", async function(table) {
    
    let stories = table.rows.map(r => r.cells[0]);

    for (let i = 0; i < stories.length; ++i) {
        assert.ok(await text(stories[i]).exists());
    }

});

step("<product> release <release> has stories <stories>", 

    async (product, release, stories) => {

    let res = stories.rows.map( r => ({
        fields:{
            summary: r.cells[0],
            status: {name: r.cells[1]
    }}}));

    await intercept(
        `api/products/${product}/releases/${release}/stories`, 
        {body:{issues:res}});

});

step("Version <version> of <product> has epics <table>", 
    async (version,product,table) => {

    let epics = table.rows.map(r => r.cells[0])

    await intercept(
        `api/products/${product}/releases/${version}/epics$`, 
        {body:epics});

    let epics_stats = table.rows.map(r => ({
            epic: r.cells[0],
            features: r.cells[1],
            points: r.cells[2],
            done_features: r.cells[3], 
            done_points: r.cells[4] 
        }));

    epics_stats.forEach( async (e) => {

        let body = e;

        await intercept(
            `api/products/${product}/releases/${version}/epics/${e.epic}`,
            {body}
        );
    });

});

step("Navigate to epics page for version <version> of <product>", 
    async (version, product) => {

        the_product = product;
        the_version = version;

        await goto(`${JIRA_APP}/products/${product}/releases/${version}/epics`);

});

step("Epics should be sorted like this <table>", async function(table) {

    let epics = table.rows.map(r => r.cells[0])

    for (let i = 0; i < epics.length - 1; ++i) {

        let a = epics[i];
        let b = epics[i + 1];

        assert.ok( 
            await text(`${b}`, 
            below(`${a}`)).exists());

    }

});

step("<product> has releases <table>", async function(product, table) {

    let releases = table.rows.map( r => ({
            name: r.cells[0],
            features: r.cells[1],
            points: r.cells[2],
            startDate: '2019-01-09',
            releaseDate: '2019-12-01'
        }));

    releases_spec.releases[product] = releases;

    await intercept(
        `api/products/${product}/versions$`, 
        {body:releases});

    releases.forEach(async r => {

        let body = {
            done_features: 10,
            done_points: 50,
            features: r.features,
            points: r.points    
        };

        let url = `api/products/${product}/releases/${r.name}$`;

        await intercept(
            url, 
            {body});
        
    });

});

step("See <product> releases are there", async function(product) {

    the_product = product;
    let releases = releases_spec.releases[product];

    await waitFor(`${releases[0].name}`);

});

step("See <product> features are there", async function(product) {

    let releases = releases_spec.releases[product];

    assert.ok( 
        await text(`${releases[0].features}`, 
            below(`${releases[0].name}`)).exists());

});

let the_product = null;
let the_version = null;

step("Go to release <release> stories page", async(release) => {

    await click( `${release}` );
    
    await waitFor("Epics");
    await waitFor("Stories");

    //await click( "Stories" );
    await goto(`${JIRA_APP}/products/${the_product}/releases/${release}/stories`);

});

step("Navigate to <product> releases page", async function(product) {

    the_product = product;
    await goto(`${JIRA_APP}/products/${product}/releases`);

});

step("See <release> release in <status> status", async function(release, status) {
    assert.ok( await text( release ).exists() );
    assert.ok( await text( 
        status, below(release)).exists() );
});
