import React, { Component } from 'react';
import {connect} from 'react-redux';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import {Table, Column, Cell} from 'fixed-data-table';

export class QuestionsTable extends Component {
    constructor(props){
        super(props);
    }
    
        render() {
            const questionDetails = this.props.questions.map((question, index) => {
                return(
                <PanelGroup key={index}>  
                    <Column header={<Cell>Question ID</Cell>} cell={<Cell>{question.id}</Cell>} width={300}/>
                    <Column header={<Cell>Users</Cell>} cell={<Cell>{question.users}</Cell>} width={300}/>
                    <Column header={<Cell>Responses</Cell>} cell={<Cell>{question.responses}</Cell>} width={300}/>   
                </PanelGroup>    
                );
        });
          return (
            <Table className="table"
                rowsCount={2}
                rowHeight={50}
                headerHeight={50}
                width={900}
                height={100}>
                {questionDetails}
            </Table> 
           );
  } 
}

export const mapStateToProps = (state, ownProps) => ({
    questions: state.questions,
    name: ownProps.name
});

export default connect(mapStateToProps)(QuestionsTable);