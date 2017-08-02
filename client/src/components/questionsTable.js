import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';
 

export class QuestionsTable extends Component {
    constructor(props){
        super(props);
    }
    
        render() {
            return (
                <Table className="table"
                    rowsCount={3}
                    rowHeight={100}
                    headerHeight={100}
                    width={900}
                    height={300}>
                    <Column  cell={<Cell>{}</Cell>}
                             header={<Cell>Question ID</Cell>} 
                             width={300}/>

                    <Column header={<Cell>Users</Cell>} cell={<Cell>{}</Cell>} width={300}/>
                    <Column header={<Cell>Responses</Cell>} cell={<Cell>{}</Cell>} width={300}/>
                </Table> 
           )
        } 
}

export const mapStateToProps = (state, ownProps) => ({
    questions: state.questions,
    data: ownProps.data
});

export default connect(mapStateToProps)(QuestionsTable);