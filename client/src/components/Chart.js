import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, toggleQuestionDetails} from '../actions/action';
import { Bar } from 'react-chartjs-2';



class Chart extends Component {
  constructor(props){
     super(props);
     this.state = {
       chartData: {
         labels: ['hello', 'hi', 'see ya', 'goodbye'],
         datasets: [
           {
             label: 'Responses',
             data: [
               5, 10, 15, 20
              ],
              backgroundColor: 'blue'
                    }
                  ]
                }
              }
            } 

  render() {

    return (
      <div className="Chart">
        <Bar data={this.state.chartData}
             options={{ }}
        />
      </div>
    )
  }
}

//this pulls in the questions from the component
export const mapStateToProps = state => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Chart);
