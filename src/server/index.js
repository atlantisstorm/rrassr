import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../shared/app';
import { matchPath, StaticRouter } from 'react-router-dom';
import routes from '../shared/routes';
import { makeStore, DEFAULT_STATE } from '../store/make-store';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise.then((data) => {
    const initialState = {...DEFAULT_STATE, entries: data || []}; // sensible default [] if we're not displaying a language page.
    const store = makeStore(initialState);
    const context = {}; // StaticRouter needs context to be defined even if we don't actually use it.
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>rrassr!</title>
          <script src="/bundle.js" defer></script>
          <script>window.__STATE__ = ${JSON.stringify(store.getState())}</script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
  }).catch(next);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});