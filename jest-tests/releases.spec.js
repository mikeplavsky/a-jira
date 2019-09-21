const { 
    intercept, openBrowser, write, 
    closeBrowser, goto, press, text, 
    below, focus,textBox, click} = require('taiko');

const headless = process.env.headless_chrome.toLowerCase() === 'true';

async function given_releases(product) {

    let table = [
        {name:12.1, features: 35, points: 240},
        {name:15.2, features: 74, points: 500},
        {name:17.3, features: 20, points: 300}];

    let releases = table.map( r => {
        return {
            ...r,
            startDate: '2019-01-09',
            releaseDate: '2019-12-01'};
    });

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

    return releases;

};

describe ("Release Page", () => {

    beforeAll( async () => {

        await openBrowser({
            headless: headless,
            args: ['--auto-open-devtools-for-tabs'] });

        let body = [{name:"RMADFE"}];    

        await intercept(
            "/api/products$", 
            {body});

    });

    afterAll( async () => {
        //await closeBrowser();
    });

    beforeEach(async () => {
        await goto('localhost:4200');
    });

    it ("Check products", async () => {
        expect( await text("RMADFE").exists() ).toBeTruthy();
    });

    it ("Check releases", async () => {

        let releases = await given_releases("RMADFE"); 

        await click("RMADFE");
        await click("Releases");

        expect( await text(releases[0].name).exists() ).toBeTruthy();

    });        
    
});