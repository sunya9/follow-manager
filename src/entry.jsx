import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, NotFoundRoute, browserHistory } from 'react-router';
import Index from './pages/index';
import About from './pages/about';
import NotFound from './pages/notfound';
import reducers from '../reducers';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import '../scss/main.scss';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import thunkMiddleware from 'redux-thunk';
import App from '../containers/App';
import 'bootstrap';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  DevTools.instrument()
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="about" component={About} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
