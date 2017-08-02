import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
class LandingPage extends Component {
  render(){
    return (
      <div id = "body">
        <div id="hero">
          <video id="video" autoPlay loop>
            <source type="video/mp4" src="/res/video/hero_video.mp4" />
          </video>
          <div id="videoOverlay">
            <div id="header">
              <h1>Chime In</h1>
              <h2>A handy app for reaching your team.</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  ids: state.inputIds,
  message: state.inputMessage
});

export default connect(mapStateToProps)(LandingPage);
