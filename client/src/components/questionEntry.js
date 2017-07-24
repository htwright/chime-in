import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion} from '../actions/action';


export class QuestionEntry extends Component {
  constructor(props){
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
  }

  //get questionsList prop & maps over each question as a listGroupItem
  getQuestions(){
    console.log('Is this working?');
    this.props.dispatch(fetchQuestion())
    .then(result => {
      const questionsList =  this.props.questions.map((question, index) => {
        console.log(question);
        return (
          <ListGroupItem> {question} </ListGroupItem>
        )
      }) 
      console.log(questionsList);
      return questionsList;
    }) 
    
  }

  render() {
    return (
      <div className="questionXYZ">
        <ListGroup> {() => this.getQuestions()} </ListGroup>
      </div>
    );
  }
}

//this pulls in the questions to the component
export const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionEntry);
