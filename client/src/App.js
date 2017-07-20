import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Button className="logout">LogOut</Button>            
          <h2>Chime-In</h2>
        </div>
          <div>
            <h1>Create a Message</h1>
            <Form className="input-field">
              <input placeholder="US Phone #" />
              <input placeholder="Message" />
                <Button>Send Message</Button>
            </Form>
            
          </div>

          <div className='column' id="admin-col-one">

            <h1>Questions</h1>
            <ListGroup>
              <ListGroupItem href="#linkA">Bob ate what?</ListGroupItem>
              <ListGroupItem href="#linkB">Who let the dogs out?</ListGroupItem>
              <ListGroupItem href="#linkC">huh?</ListGroupItem>
            </ListGroup>
          </div>

          <div className='column' id="admin-col-two">
            <h1>Users</h1>

            {/* function alertClicked() {
              alert('You clicked the third ListGroupItem');} */}

            <ListGroup>
              <ListGroupItem href="#link1">Joe</ListGroupItem>
              <ListGroupItem href="#link2">Jane</ListGroupItem>
              <ListGroupItem href="#link2">George</ListGroupItem>
            </ListGroup>
          </div>
    </div>
    );
  }
}

export default App;
