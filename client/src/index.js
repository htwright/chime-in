import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import App from './App';
import Login from "./components/login"
import './index.css';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
  //Swap out Welcome & App to see the two components
  //<Welcome/>,
  <Provider store={store}>
     <App/>
  </Provider>,
  document.getElementById('root')
);
