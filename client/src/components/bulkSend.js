import React, { Component } from 'react';
import './App.css';

class BulkSend extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chime-In</h2>
        </div>
        <form className="input-field">
          <input placeholder="Comma separated ids" />
          <input placeholder="Message" />
          <button type="submit"> Send Message </button>
        </form>
      </div>
    );
  }
}

export default BulkSend;
