import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion} from '../actions/action';


export class QuestionEntry extends Component {

  componentDidMount(){
    this.props.dispatch(fetchQuestion());
  }

  render() {
        const questionsList = this.props.questions.map((question, index) => {
        console.log(question);
        return (
          <ListGroupItem key={index}> {question.question} </ListGroupItem>
        )
      })

    return (
      <div className="questionXYZ">
        <ListGroup> {questionsList} </ListGroup>
      </div>
    );
  }
}

//this pulls in the questions to the component
export const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionEntry);
