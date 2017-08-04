import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import LoginPage from './components/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/landing';
// import QuestionEntry from './components/questionEntry';
// import Users from './components/users';
import AddUser from './components/addUser';
// import Button from 'react-bootstrap/lib/Button';
// import Form from 'react-bootstrap/lib/Form';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {connect} from 'react-redux';
// import ListGroup from 'react-bootstrap/lib/ListGroup';
// import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { sendMessage, createUser, sendEmail } from './actions/action';
// import './App.css';
// import './App.css';

class App extends Component {

  componentDidMount() {
    const accessToken = Cookies.get('accessToken');

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
