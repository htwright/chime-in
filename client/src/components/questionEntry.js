import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion} from '../actions/action';
import QuestionsTable from './questionsTable';

export class QuestionEntry extends Component {
   constructor(props){
     super(props);
   //state added to control when table displays
     this.state = {
       showDetails: false
      }
      //  this.showQuestionDetails = this.showQuestionDetails.bind(this);
    }

    //add onClick handler that changes showQuestionDetails state
    onClick(e){
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
          <ListGroupItem onClick={this.onClick.bind(this)} 
                         href="#" 
                         key={index}> {question.question} </ListGroupItem>
        )
      })

///////
        // <a onClick={this.onClick.bind(this)} href='#'>Post a reply to this comment</a>
       // {this.state.showReply && < ReplyForm / >}
//////

    return (
      <div className="questionXYZ">
        <ListGroup> {questionsList} </ListGroup>
      </div>
        //  <QuestionsTable/> 
    );
  }
}

//this pulls in the questions to the component
export const mapStateToProps = state => ({
  questions: state.questions,
  showDetails: state.showDetails
});

export default connect(mapStateToProps)(QuestionEntry);
