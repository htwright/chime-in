import React from 'react';
import ReactDOM from 'react-dom';
//import Welcome from './Welcome';
import App from './App';
import './index.css';
import store from './store';
import {Provider} from 'react-redux';
// import Chart from './components/Chart';

ReactDOM.render(
  //Swap out Welcome & App to see the two components
  //<Welcome/>,
  <Provider store={store}>
     <App/>
  </Provider>,
  document.getElementById('root')
);
