import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion, setActiveQuestion} from '../actions/action';
import Chart from './Chart';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';

export class QuestionEntry extends Component {
  constructor(props){
     super(props);
  }

  componentDidMount(){
  this.props.dispatch(fetchQuestion());

  }

  render() {
    const questionsList = this.props.questions.map((question, index) => {
      console.log(question);
      return (
        <div>
          <ListGroupItem key={index} onClick = {() => this.props.dispatch(setActiveQuestion(question))}> {question.question} </ListGroupItem>
          <Panel header={question.question} eventKey={key} bsStyle="info"></Panel>
        </div>
      );
    });
//questionsList += this.props.questions.map((question, key) => {
//return (
//<Panel header={question.question} eventKey={key} bsStyle="info"></Panel>
       // )

        })
        return (
          <div className="questionXYZ">
            <Accordion>{questionsList}</Accordion>
            <Chart/>
          </div>
        );
  }

}

export const mapStateToProps = state => ({
  questions: state.questions,
  activeQuestion: state.activeQuestion
});

export default connect(mapStateToProps)(QuestionEntry);

