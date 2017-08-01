import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import QuestionEntry from './questionEntry';
import Users from './users';
import AddUser from './addUser';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {connect} from 'react-redux';
// import ListGroup from 'react-bootstrap/lib/ListGroup';
// import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {sendMessage, setIdInput, setMessageInput} from '../actions/action';
import './landing.css';

class Landing extends Component {
  constructor(props){
    super(props);
  //   this.state = {
  //     id: null,
  //     message: null
  //   }
  //   this.manageState = this.manageState.bind(this);
  //   // this.handleClick = this.handleClick.bind(this);
  }

  doPhoneStuff(event,id, message){
    event.preventDefault();
    this.props.dispatch(sendMessage(id, message));
  }

  // manageState(target,value){
  //   this.setState({...this.state,[target]:value});
  //   console.log(this.state)
  // }

  // handleClick(e) {
  //   e.preventDefault();
  //   this.props.history.push('/adduser');
  // }

  render() {
    return (
        <div className="App">

          <div className="App-header">
            <Button className="logout">LogOut</Button>
            <h2>Chime-In</h2>
          </div>
            <div>
              <h1>Create a Message</h1>
              <Form onSubmit={(event)=>this.doPhoneStuff(event,this.props.ids.split(","),this.props.message)} inline>
                <FormGroup controlId="formInlinePassword">
                  <ControlLabel>Phone #</ControlLabel>
                  {' '}
                  <FormControl onChange={e=>this.props.dispatch(setIdInput(e.target.value))} type="text" placeholder="US Phone Number"/>
                  </FormGroup>
                  {' '}
                <FormGroup controlId="formInlineName">
                  <ControlLabel></ControlLabel>
                  {' '}
                  <FormControl onChange={e=>this.props.dispatch(setMessageInput(e.target.value))} type="text" placeholder="Enter message here" />
                </FormGroup>
                {' '}
                  <Button bsStyle="primary" className="submit_sms" type="submit">Enter</Button>
              </Form>
            </div>

            <div className='users' id="admin-users">
              <h1>Users</h1>
              <Users/>
            </div>

            <div className='questions' id="admin-questions">
              <h1>Questions</h1>
              <QuestionEntry/>
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  ids: state.inputIds,
  message: state.inputMessage
});

export default connect(mapStateToProps)(Landing);
