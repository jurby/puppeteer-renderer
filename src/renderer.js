'use strict';

const puppeteer = require('puppeteer');

class Renderer {
  constructor(browser) {
    this.browser = browser;
  }

  async createPage(url) {
    const page = await this.browser.newPage();
    await page.goto(url);
    return page;
  }

  async render(url) {
    let page = null;
    try {
      page = await this.createPage(url);
      const html = await page.content();
      return html;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  async pdf(url, landscape, format) {
    let page = null;
    try {
      page = await this.createPage(url);
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
