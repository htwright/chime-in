import React, { Component } from 'react';
import QuestionEntry from './components/questionEntry';
import Users from './components/users';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
<<<<<<< HEAD
import { sendMessage } from './actions/action';

=======
import { sendPhoneMessage } from './actions/action';
>>>>>>> origin/master
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      message: null
    }

    this.manageState = this.manageState.bind(this);
  }

  doPhoneStuff(event,id, message){
    event.preventDefault();
    this.props.dispatch(sendMessage(id, message));
  }

  manageState(target,value){
    this.setState({...this.state,[target]:value});
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <Button className="logout">LogOut</Button>
          <h2>Chime-In</h2>
        </div>
          <div>
            <h1>Create a Message</h1>
            <Form onSubmit={(event)=>this.doPhoneStuff(event,this.state.id.split(","),this.state.message)} inline>
              <FormGroup controlId="formInlinePassword">
                <ControlLabel>Phone #</ControlLabel>
                {' '}
                <FormControl onChange={e=>this.manageState("id",e.target.value)} type="text" placeholder="US Phone Number"/>
                </FormGroup>
                {' '}
              <FormGroup controlId="formInlineName">
                <ControlLabel></ControlLabel>
                {' '}
                <FormControl onChange={e=>this.manageState("message",e.target.value)} type="text" placeholder="Enter message here" />
              </FormGroup>
              {' '}
                <Button type="submit">Enter</Button>
            </Form>
          </div>

          <div className='column' id="admin-col-one">
            <h1>Questions</h1>
            <QuestionEntry/>
          </div>

          <div className='column' id="admin-col-two">
            <h1>Users</h1>
            <Users/>
            {/* <ListGroup>
              <ListGroupItem href="#link1">Joe</ListGroupItem>
              <ListGroupItem href="#link2">Jane</ListGroupItem>
              <ListGroupItem href="#link2">George</ListGroupItem>
            </ListGroup> */}
          </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(App);
