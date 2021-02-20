import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createStore, combineReducers } from 'redux'

import './index.css';
import App from './App';
import appReducer from './redux/reducers';

import './scenes/components/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

const isProd = false

const store = createStore(
  combineReducers({ app: appReducer }),
  isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
      <AppComponent />
  </Provider>
)

const rootHtml =   document.getElementById('root')
ReactDOM.render(wrapApp(App, store), rootHtml)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
