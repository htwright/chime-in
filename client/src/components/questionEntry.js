import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, setActiveQuestion} from '../actions/action';
import Chart from './Chart';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';
import {Cell, Column, Table} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';

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
          <Panel header={question.question}  eventKey={index} bsStyle="info">
              <Table className="table"
                    rowsCount={2}
                    rowHeight={100}
                    headerHeight={100}
                    width={1155}
                    height={300}>
                    <Column header={<Cell>Question ID</Cell>} cell={<Cell>{question.id}</Cell>} width={100}/>
                    <Column header={<Cell>Users</Cell>} cell={<Cell>{question.users}</Cell>} width={200}/>
                    <Column header={<Cell>Responses</Cell>} cell={<Cell>{question.users}</Cell>} width={900}/>
              </Table> 
          </Panel>
        
      );
    });
        
    return (
          <div className="questionXYZ">
            <Accordion>{questionsList}</Accordion>
            <Chart questionData={questionsList}/>
          </div>
    );
  }

}

export const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionEntry);

