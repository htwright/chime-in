import React, { Component } from 'react';
import './App.css';
import QuestionEntry from './components/questionEntry'

class App extends Component {
  //temporary stuff that needs to be moved later
  //makes an api request and then sends a message.  Also needs to alter the user to have a question.
  sendMessages(message, recipients){
    recipients.forEach(el=>{
      console.log(el)

      fetch("http://localhost:8080/api/users/get/"+el)
        .then(el=>el.text())
        .then(el=>{

          fetch("http://localhost:8080/api/messages/send", {
            method: 'POST',
            body: JSON.stringify({
              "phone": el,
              "message":message
            }),
            headers:{'content-type': 'application/json'}
          }).then(el=>console.log(el))
        })


    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chime-In</h2>
        </div>
        <QuestionEntry buttonPressHandler={(message, id)=>this.sendMessages(message,id)} question="bob" targets={["1","2"]} responses="" />
      </div>

    );
  }
}

export default App;
