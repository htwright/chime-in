import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchQuestion, toggleQuestionDetails} from '../actions/action';
import { Bar, Doughnut } from 'chart.js';


class Chart extends Component {
  constructor(props){
     super(props);

     this.state = {
       chartData: {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [65, 59, 80, 81, 56, 55, 40]
  }]
}
      }
  }
    newFunc(){
      console.log("did it work?");
      var myChart = new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  console.log(myChart);
    } 

  render() {

    return (
      <div className="Chart">
        <canvas id='chart'></canvas>
      </div>, ()=>this.newFunc()
    )
  }
}

//this pulls in the questions from the component
export const mapStateToProps = state => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Chart);

