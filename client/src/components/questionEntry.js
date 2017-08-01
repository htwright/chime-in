import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/action';
// import QuestionsTable from './questionsTable';
import Chart from './Chart';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';
import {Table, Column, Cell} from 'fixed-data-table';



export class QuestionEntry extends Component {
  constructor(props){
     super(props);
  }

  componentDidMount(){
  this.props.dispatch(fetchQuestion());
  }

  render() {
        const questionsList = this.props.questions.map((question, key) => {
        console.log(question);
        console.log(question.question);
        return (
          <Panel header={question.question} eventKey={key} bsStyle="info"></Panel>
        )

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
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionEntry);
