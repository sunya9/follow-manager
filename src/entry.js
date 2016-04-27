import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Index from './containers/Index';
import NotFound from './components/NotFound';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import '../scss/main.scss';
import configureStore, { DevTools } from './store/configureStore';

import App from './containers/App';
import 'bootstrap';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
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
