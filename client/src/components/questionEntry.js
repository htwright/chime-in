import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, setActiveQuestion} from '../actions/action';
import Chart from './Chart';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';
import {Cell, Column, Table} from 'fixed-data-table';
import QuestionsTable from './questionsTable';

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
        
          <Panel header={question.question} key={index} eventKey={index} bsStyle="info">
             <h1>hello world</h1>
             {/* <QuestionsTable name={'Ray'}/>  */}
          </Panel>
        
      );
    });
        
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

