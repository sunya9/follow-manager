import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createDevTools } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import reducers from '../../reducers';
import { routerReducer } from 'react-router-redux';

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

export default function configureStore() {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  return createStoreWithMiddleware(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    DevTools.instrument()
  );
}
