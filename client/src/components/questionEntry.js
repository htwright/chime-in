import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion, toggleQuestionDetails} from '../actions/action';
import QuestionsTable from './questionsTable';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';
import {Table, Column, Cell} from 'fixed-data-table';



export class QuestionEntry extends Component {
  constructor(props){
     super(props);
     this.toggleQuestionDetails = this.toggleQuestionDetails.bind(this);
     this.state = {
       showDetails: true
     }
  }

    //handler changes showDetails in state
    toggleQuestionDetails(e){
      e.preventDefault();
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

  componentDidMount(){
  //  let q = this.props.dispatch(fetchQuestion()).then(res=>{
  //   console.log(res);
  //   this.setState({questions: res});
  //   console.log(this.state);
  //  });
  this.props.dispatch(fetchQuestion());
  }

  render() {
        const questionsList = this.props.questions.map((question, index) => {
        console.log(question);
        return (
          // <ListGroupItem onClick={this.toggleQuestionDetails} key={index}> {question.question} </ListGroupItem>
          
          <Panel header={question.question} eventKey={index} bsStyle="info">
            {question.responses}

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
        {/* <ListGroup> {questionsList} </ListGroup> */}
        <Accordion>{questionsList}</Accordion>
      </div>
    );
  }
}

//this pulls in the questions & showDetails from the component
export const mapStateToProps = state => ({
  questions: state.questions,
  showDetails: state.showDetails
});

export default connect(mapStateToProps)(QuestionEntry);
