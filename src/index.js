'use strict';

const express = require('express');
const createRenderer = require('./renderer');

const port = process.env.PORT || 80;

const app = express();

let renderer = null;

// Configure.
app.disable('x-powered-by');

// Render url.
app.use(async (req, res, next) => {
  let url = req.query.url;
  let landscape = req.query.landscape === "true"
  let format = req.query.format
  let user = req.query.user
  let password = req.query.password

  try {
    const pdf = await renderer.pdf(url, landscape, format, user, password);
    res.set('Content-type', 'application/pdf').send(pdf);
  } catch (e) {
    next(e);
  }
});

// Error page.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('There was an error');
});

// Create renderer and start server.
createRenderer().then((createdRenderer) => {
  renderer = createdRenderer;
  console.info('Initialized renderer.');

  app.listen(port, () => {
    console.info(`Listening on port ${port}.`);
  });
}).catch((e) => {
  console.error('Failed to initialze renderer.', e);
});
