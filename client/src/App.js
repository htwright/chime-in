import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import Landing from './components/landing';
import QuestionEntry from './components/questionEntry';
import Users from './components/users';
import AddUser from './components/addUser';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {connect} from 'react-redux';
// import ListGroup from 'react-bootstrap/lib/ListGroup';
// import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { sendMessage } from './actions/action';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      message: null
    }
    this.manageState = this.manageState.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  doPhoneStuff(event,id, message){
    event.preventDefault();
    this.props.dispatch(sendMessage(id, message));
  }

  manageState(target,value){
    this.setState({...this.state,[target]:value});
    console.log(this.state)
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   this.props.history.push('/adduser');
  // }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/adduser" component={AddUser}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(App);
