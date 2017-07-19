import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <button className="logout">LogOut</button>            
          <h2>Chime-In</h2>
        </div>

        <section className="adminSection">
          <div className='column' id="admin-col-one">
            <h1>Create a Message</h1>
            <form className="input-field">
              <input placeholder="US Phone #" />
              <input placeholder="Message" />
              <button type="submit"> Send Message </button>
            </form>
          </div>
          <div className='column' id="admin-col-two">
            <h1>Message Responses</h1>
            <div>
              <div className="topic">Wire Frames</div>
              <div className="topic">User Story A</div>
              <div className="topic">Project Specs</div>
            </div>             
          </div>
        </section>
    </div>
    );
  }
}

export default App;
