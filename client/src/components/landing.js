import React, { Component } from 'react';
import QuestionEntry from './questionEntry';
import Users from './users';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {connect} from 'react-redux';
import AddUser from './addUser'
import {sendMessage, setIdInput, setMessageInput} from '../actions/action';
import './landing.css';

class Landing extends Component {

  doPhoneStuff(event,ids, message){
    event.preventDefault();
      this.props.dispatch(sendMessage(ids, message, this.props.admin));


  }

  render() {
    return (
        <div className="App">

          <div className="App-header">
            <Button className="logout" href={'/api/auth/logout'}>Log Out</Button>
            <h2>Simmetric</h2>
          </div>
            <div>
              <h1>Create a Message</h1>
              <Form onSubmit={(event)=>this.doPhoneStuff(event,this.props.activeUsers,this.props.message)} inline>
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
                <FormGroup controlId="formInLineUsers">
                <span>Available targets</span>
                <Users/>
                </FormGroup>
                  <Button bsStyle="primary" className="submit_sms" type="submit">Enter</Button>
              </Form>
            </div>

            <div className='questions' id="admin-questions">
              <h1>Questions</h1>
              <QuestionEntry/>
              <AddUser />
            </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  ids: state.inputIds,
  activeUsers: state.activeUsers,
  message: state.inputMessage,
  admin: state.currentUser.id
});

export default connect(mapStateToProps)(Landing);
