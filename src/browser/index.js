import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeStore } from '../store/make-store';

// __STATE__ set server side.
const initialState = window.__STATE__;
delete window.__STATE__;

const store = makeStore(initialState);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);