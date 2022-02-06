import Puppeteer, { Page } from "puppeteer";


const COVRADAR_BASEURL = 'https://covradar.net';

(async function () {
    // We're using an actual browser to make sure that 
    // all Dash requests are sent properly so that their
    // results are being cached
    let browser = await Puppeteer.launch({});
    let page = await browser.newPage();

    //uncomment the lines below for debugging 

    // page
    //     .on("close", (e) => console.log("Page closed"))
    //     .on("domcontentloaded", (e) => console.log("DOM content loaded"))
    //     .on("error", (e) => console.log(e))
    //     .on("frameattached", (e) => console.log("Frame attached"))
    //     .on("framedetached", (e) => console.log("Frame detached"))
    //     .on("framenavigated", (e) => console.log("Frame navigated"))
    //     .on("load", (e) => console.log("Page laoded"))
    //     .on("request", (e) => console.log(e.url()))
    //     .on("pageerror", ({ message, stack, name }) => {
    //         console.error("puppeteer error @");
    //         console.error(stack);
    //         console.error(message);
    //         console.error(name);
    //     })
    //     .on("response", (response) =>
    //         console.log(`${response.status()} ${response.url()}`)
    //     )
    //     .on("requestfailed", (request) =>
    //         console.log(`${request.failure()?.errorText} ${request.url()}`)
    //     )
    // .on("console", (msg) => {
    //     for (let i = 0; i < msg.args().length; ++i) {
    //         console.log("console msg");
    //         console.log(`${i}: ${msg.args()[i]}`);
    //     }
    // });
    console.log('trying to load:  ' + COVRADAR_BASEURL + '/report')
    await page.goto(COVRADAR_BASEURL + '/report');
    await waitForCorrectTitle(page);

    console.log('trying to load:  ' + COVRADAR_BASEURL + '/germany')
    await page.goto(COVRADAR_BASEURL + '/germany');
    await waitForCorrectTitle(page);
})()

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function waitForCorrectTitle(page: Page) {
    let waitTime = 100;
    const maxWaitTime = 5 * 60 * 1000;
    while (waitTime < maxWaitTime) {
        await sleep(waitTime);
        const title = await page.title()
        if (title.toLowerCase().includes('updating')) {
            console.log(`Page is still loading, retrying in ${waitTime / 1000} seconds`)
            waitTime *= 2;
        }
        else {
            console.log('Page loaded')
            return;
        }
    }
}
