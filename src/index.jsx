import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'sanitize.css/sanitize.css';
import 'antd/dist/antd.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from 'app';
import { HelmetProvider } from 'react-helmet-async';
import { configureAppStore } from 'store/configureStore';
import ErrorBoundary from 'app/components/ErrorBoundary';

import './locales/i18n';

import { registerServiceWorker } from './serviceWorker';
import firebaseUtils from 'utils/firebase';

const initialState = {};

export const store = configureAppStore(initialState);
const MOUNT_NODE = document.getElementById('root');

const ConnectedApp = ({ Component }) => (
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      </React.StrictMode>
    </HelmetProvider>
  </Provider>
);

const render = Component => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  module.hot.accept(['./app'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

if (firebaseUtils.isSupported) registerServiceWorker();
