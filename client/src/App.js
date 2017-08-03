import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import LoginPage from './components/login';
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
import { sendMessage, createUser, sendEmail } from './actions/action';
// import './App.css';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   id: null,
    //   message: null
    // }
    // this.manageState = this.manageState.bind(this);
    // // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    console.log('APP', accessToken);
    if (accessToken) {
        fetch('/api/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            console.log('RES', res)
            if (!res.ok) {
                if (res.status === 401) {
                    Cookies.remove('accessToken');
                    return;
                }
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(currentUser => {
            console.log("CURRENTUSER", currentUser)
            this.props.dispatch(createUser(currentUser))
        });
    }
}

  doPhoneStuff(event,id, message){
    event.preventDefault();
    this.props.dispatch(sendMessage(id, message));
  }

  doEmailStuff(event,id, message){
    event.preventDefault();
    this.props.dispatch(sendEmail(id, message));
  }

  manageState(target,value){
    this.setState({...this.state,[target]:value});
    console.log(this.state)
  }


  render() {
    if (!this.props.currentUser) {
          return <LoginPage />;
      }

    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/adduser" component={AddUser}/>
        </div>
          {/* <div>
            <h1>Create a Message</h1> */}
            {/* <Form onSubmit={(event)=>this.doPhoneStuff(event,this.state.id.split(","),this.state.message)} inline>
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
            </Form> */}
            {/* <Form onSubmit={(event)=>this.doEmailStuff(event,this.state.id.split(","),this.state.message)} inline>
            <FormGroup controlId="formInlinePassword">
              <ControlLabel>Email</ControlLabel>
              {' '}
              <FormControl onChange={e=>this.manageState("id",e.target.value)} type="text" placeholder="Email"/>
              </FormGroup>
              {' '}
            <FormGroup controlId="formInlineName">
              <ControlLabel></ControlLabel>
              {' '}
              <FormControl onChange={e=>this.manageState("message",e.target.value)} type="text" placeholder="Enter message here" />
            </FormGroup>
            {' '}
              <Button type="submit">Enter</Button>
          </Form> */}


       {/* <div className='column' id="admin-col-one">
             <h1>Questions</h1>
             <QuestionEntry/>
           </div>

           <div className='column' id="admin-col-two">
             <h1>Users</h1>
              function alertClicked() {
               alert('You clicked the third ListGroupItem');}
               <Users/>
           </div>
           </div> */}
      </Router>

    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  currentUser: state.currentUser,
  ids: state.inputIds,
  message: state.inputMessage
});

export default connect(mapStateToProps)(App);
