'use strict';

const puppeteer = require('puppeteer');

const BROWSER_WS_ENDPOINT = process.env.BROWSER_WS_ENDPOINT || '';
const PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD || false;

const browserOptions = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}

class Renderer {
  constructor(browser) {
    this.browser = browser;
  }

  async pdf(url, landscape, format, user, password) {
    const page = await this.browser.newPage();
    await page.authenticate({ username: user,
                              password: password});
    await page.goto(url);
    try {
      const buffer = await page.pdf({ format: format,
                                   landscape: landscape });
      return buffer;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}

async function create() {
  let browser
  if(PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === true && BROWSER_WS_ENDPOINT.length > 0) {
    browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_WS_ENDPOINT,
    });
  } else {
    browser = await puppeteer.launch(browserOptions);
  }
  return new Renderer(browser);
}

module.exports = create;
