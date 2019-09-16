const { 
    intercept, 
    openBrowser,
    goto, 
    below, 
    text, 
    above, 
    closeBrowser, 
    client} = require('taiko'); 

const nH = require('./node_modules/taiko/lib/networkHandler.js');

(async () => {
    try {

        await openBrowser();

        await intercept("/api/products/RMADFE/features/done", {body: '{"velocity":29}'});
        await intercept("/api/products/RMAZ/features/done", {body: '{"velocity":70}'});
        await intercept("/api/products/QMMP/features/done", {body: '{"velocity":30}'});

        nH.resetInterceptors();

        await goto("http://localhost:4200");

        await text("29", below("RMADFE")).exists();
        await text("70", below("RMAZ")).exists();
        await text("30", below("QMMP")).exists();

    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
