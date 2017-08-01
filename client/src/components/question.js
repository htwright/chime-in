import React, { Component } from 'react';
import {connect} from 'react-redux';

export class question extends Component {
  render(){
    return (<ul className = 'question'>
      <li><h1>{this.props.activeQuestion.question}</h1></li>
      <li><span>{this.props.activeQuestion.id}</span></li>
      <li><span>{this.props.activeQuestion.users}</span></li>
      <li><span>{this.props.activeQuestion.responses}</span></li>
      </ul>
    );
  }
}



const mapStateToProps = state => ({
  activeQuestion: state.activeQuestion
});

export default connect(mapStateToProps)(question);
