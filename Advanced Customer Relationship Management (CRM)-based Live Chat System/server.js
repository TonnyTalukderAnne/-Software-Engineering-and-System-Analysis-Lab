const express = require('express');
const next = require('next');
const jsonServer = require('json-server');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const jsonApi = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.prepare().then(() => {
  const server = express();

  // Mount JSON Server at /api
  jsonApi.use(middlewares);
  jsonApi.use(router);
  server.use('/', jsonApi);

  // All other routes go to Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Server ready on http://localhost:${port}`);
    console.log(`> JSON Server running at http://localhost:${port}/`);
  });
});
