import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import App from './App';
<<<<<<< HEAD
import LandingPage from './components/LandingPage';
import Login from "./components/login"
=======
>>>>>>> master
import './index.css';
import store from './store';
import {Provider} from 'react-redux';
// import Chart from './components/Chart';

ReactDOM.render(
  //Swap out Welcome & App to see the two components
  //<Welcome/>,
  <Provider store={store}>
     <LandingPage/>
  </Provider>,
  document.getElementById('root')
);
