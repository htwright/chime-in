import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chime-In</h2>
        </div>
        <form className="input-field">
          <input placeholder="US Phone #" />
          <input placeholder="Message" />
          <button type="submit"> Send Message </button>
        </form>
      </div>
    );
  }
}

export default App;
