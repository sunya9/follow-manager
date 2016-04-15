import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Index from './pages/index';
import About from './pages/about';
import NotFound from './pages/notfound';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import '../scss/main.scss';
import configureStore, { DevTools } from '../client/store/configureStore';

import App from '../containers/App';
import 'bootstrap';

const store = configureStore();
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
