import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from './states/reducers'
import App from './App'

const loggerMiddleware = createLogger({
    collapsed: true,
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
document.getElementById('root'));




// Potention init action calls
//store.dispatch(action('command'))
