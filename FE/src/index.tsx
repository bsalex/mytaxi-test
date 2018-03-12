import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppComponentContainer from './App/AppComponentContainer';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <AppComponentContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
