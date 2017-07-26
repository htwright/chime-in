import React, { Component } from 'react';
import {connect} from 'react-redux';
//import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
// Table data as a list of array. 
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more 
];


export class QuestionsTable extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     questions: []
  //   }
  //   //this.getQuestions = this.getQuestions.bind(this);
  // }



  render() {
    return (
      <Table
        rowsCount={100}
        rowHeight={50}
        width={1000}
        height={500}>
        <Column
          cell={<Cell>Column 1</Cell>}
          width={200}
        />
        <Column
          cell={<Cell>Column 2</Cell>}
          width={200}
        />
      </Table>
    );
  }
}

export default QuestionsTable;