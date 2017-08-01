import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, toggleQuestionDetails} from '../actions/action';
import QuestionsTable from './questionsTable';
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
        const questionsList = this.props.questions.map((question, index) => {
        console.log(question);
        return (

            <Panel header={question.question} eventKey={index} bsStyle="info">
             <Chart/> 
              <Table
                rowsCount={2}
                rowHeight={50}
                headerHeight={50}
                width={900}
                height={200}>
                <Column cell={<Cell>{question.id}</Cell>}
                        header={<Cell>Question ID</Cell>}
                        width={300}/>
                <Column cell={<Cell>{question.users}</Cell>}
                        header={<Cell>User ID</Cell>}
                        width={300}/>
                <Column cell={<Cell>{question.responses}</Cell>}
                        header={<Cell>Response</Cell>}
                        width={300}/>
              </Table>
            </Panel>
        )
      })
    return (
      <div className="questionXYZ">
        <Accordion>{questionsList}</Accordion>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(QuestionEntry);
