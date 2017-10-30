'use strict';

const express = require('express');
const createRenderer = require('./renderer');

const port = process.env.PORT || 3000;

const app = express();

let renderer = null;

// Configure.
app.disable('x-powered-by');

// Render url.
app.use(async (req, res, next) => {
  let url = req.query.url;
  let landscape = req.query.landscape || false
  let format = req.query.format || 'A4'

  try {
    const pdf = await renderer.pdf(url, landscape, format);
    res.set('Content-type', 'application/pdf').send(pdf);
  } catch (e) {
    next(e);
  }
});

// Error page.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Oops, An expected error seems to have occurred.');
});

// Create renderer and start server.
createRenderer().then((createdRenderer) => {
  renderer = createdRenderer;
  console.info('Initialized renderer.');

  app.listen(port, () => {
    console.info(`Listen port on ${port}.`);
  });
}).catch((e) => {
  console.error('Fail to initialze renderer.', e);
});
