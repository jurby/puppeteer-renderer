'use strict';

const puppeteer = require('puppeteer');

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
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  return new Renderer(browser);
}

module.exports = create;
