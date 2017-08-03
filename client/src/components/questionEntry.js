import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion} from '../actions/action';
import Chart from './Chart';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';

export class QuestionEntry extends Component {

  componentDidMount(){
    this.props.dispatch(fetchQuestion());
  }

  render() {   
    
    const questionsList = this.props.questions.map((question, index) => {
      let acc = {};
      if(question.responses.length > 0){
        
        question.responses.forEach(el=>{
          if(!acc.hasOwnProperty(el.body)){
            acc[el.body] = 0;
          }
          acc[el.body]++;
        })
      }
  
      return (
          <Panel header={question.question}  key={index} eventKey={index} bsStyle="info">
            <Chart questionData={acc}/>
          </Panel>

      );
    });

    return (
          <div className="questionXYZ">
            <Accordion>{questionsList}</Accordion>
          </div>
    );
  }

}

export const mapStateToProps = state => ({
  questions: state.questions
});

export default connect(mapStateToProps)(QuestionEntry);
