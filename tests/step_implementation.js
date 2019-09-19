/* globals gauge*/
"use strict";
const { 
    intercept, openBrowser, write, 
    closeBrowser, goto, press, text, 
    below, focus,textBox, click} = require('taiko');

const networkHandler = require(
    '../node_modules/taiko/lib/networkHandler.js');

const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless,
        args: ['--auto-open-devtools-for-tabs'] });
});

afterSuite(async () => {
    //await closeBrowser();
});

beforeScenario( async () => {
    networkHandler.resetInterceptors();
});

step("Products are <products>", async (products) => {

    let body = products.split(",").map(p => {
        return {name:p}; });

    await intercept(
        "/api/products$", 
        {body});

});

step("Goto products page", async () => {
    await goto('localhost:4200');
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
    await goto(`localhost:4200/products/${product}/search`);
});

step("Search for <query>", async function(query) {

    await focus(textBox(below("products")));
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
    await click( "Releases" );
});

step("<product> has releases <rs>", async function(product, rs) {

    let releases = rs.split(",");

    let body = releases.map(r => {
        return {
            name:r}; 
    });

    await intercept(
        `api/products/${product}/versions$`, 
        {body});

    releases.forEach(async r => {

        let body = {
            done_features:10,
            done_points: 50,
            features:25,
            points: 125    
        };

        await intercept(
            `api/products/${product}/releases/${r}$`, 
            {body});
        
    });

});