import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchQuestion} from '../actions/action';


export class QuestionEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: []
    }
    //this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount(){
   let q = this.props.dispatch(fetchQuestion()).then(res=>{
    console.log(res);
    this.setState({questions: res});
    console.log(this.state);
   });
   
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
        const questionsList =  this.state.questions.map((question, index) => {
        console.log(question);
        return (
          <ListGroupItem> {question.question} </ListGroupItem>
        )
      }) 

    return (
      <div className="questionXYZ">
        <ListGroup> {questionsList} </ListGroup>
      </div>
    );
  }
}

//this pulls in the questions to the component
export const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionEntry);
