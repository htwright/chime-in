import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion, toggleQuestionDetails} from '../actions/action';
import QuestionsTable from './questionsTable';

export class QuestionEntry extends Component {
   constructor(props){
     super(props);
        //this.showDetails = this.showDetails.bind(this);
    }

    //show handler that changes showDetails in the state
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

  //get questionsList prop & maps over each question as a listGroupItem
  //  makeQuestions(){
  //    console.log("its working!");
  //  }
  //     const questionsList =  this.props.questions.map((question, index) => {
  //       console.log(question);
  //       return (
  //         <ListGroupItem> {question} </ListGroupItem>
  //       )
  //     })
  //     console.log(questionsList);
  //     return questionsList;
  //   })

  // }

  render() {
        const questionsList = this.props.questions.map((question, index) => {
        console.log(question);
        return (
          <ListGroupItem onClick={this.toggleQuestionDetails.bind()} 
                         href={<QuestionsTable/>}
                         key={index}> {question.question} </ListGroupItem>
                         //key={index}> {question.question && <QuestionsTable/>} </ListGroupItem>

        )
      })
    return (
      <div className="questionXYZ">
        <ListGroup> {questionsList} </ListGroup>
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
