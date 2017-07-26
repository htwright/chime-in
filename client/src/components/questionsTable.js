import React, { Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

export class QuestionsTable extends Component {

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