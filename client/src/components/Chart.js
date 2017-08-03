import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props){
     super(props);
     console.log(props.questionData)
     let data = [];
     let keys = [];
     Object.keys(props.questionData).forEach(el=>{
      keys.push(el);
      data.push(props.questionData[el]);
      console.log(keys);
      console.log(data);
     })
     this.chartData = { 
                    labels: keys,
                    datasets: [{
                      label: 'Question Responses',
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'],
                      borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'],
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                      data: data
                    }]
                  }
     this.state = {
       data: [2,5,7,9]
    }
  }

  render() {
    return (
      <div className="Chart">
        <Doughnut data={this.chartData}
             options={{ }}/>
      </div>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  questions: state.questions
});

export default connect(mapStateToProps)(Chart);

