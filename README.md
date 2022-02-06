# init-covradar-cache

This contains a script to load both covradar pages after the cache has been reset in order to shorten loading times on first actual visit.
It uses [puppeteer](https://github.com/puppeteer/puppeteer), which is a headless browser, to make sure all resources are loaded.


## Installing

You need [node.js](https://nodejs.org/en/) and run the following command in the project root
```bash
npm install
```

## Executing

To load both the report and germany page of a covradar instance running at COVRADAR_BASEURL (change in index.ts), run:
```bash
npm run start
```
