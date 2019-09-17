/* globals gauge*/
"use strict";
const { 
    intercept, openBrowser, write, 
    closeBrowser, goto, press, text, 
    below, focus, inputField, toRightOf} = require('taiko');

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
    await closeBrowser();
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