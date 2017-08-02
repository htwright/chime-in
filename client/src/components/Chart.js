import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Bar } from 'react-chartjs-2';


class Chart extends Component {
  constructor(props){
     super(props);

     this.state = {
       chartData: {
         labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
         datasets: [{
           label: 'Database Questions',
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
           borderWidth: 1,
           hoverBackgroundColor: 'rgba(255,99,132,0.4)',
           hoverBorderColor: 'rgba(255,99,132,1)',
          //  data: [5, 15, 8, 11, 6, 3, 4]
         }]
       }
     }
  }

  render() {
    const res = this.props.questions.forEach((question,index) => {
      console.log(question.responses.length);
      return(question.responses.length);
    })

    return (
      <div className="Chart">
        <Bar data={res}
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

