import React from 'react';
import App from './entry';
import { Provider } from 'react-redux';

module.exports = (store) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
