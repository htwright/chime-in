import React, { Component } from 'react';

class QuestionEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: props.question,
      targets: props.targets,
      responses: props.responses
    }
  }

  render() {
    return (
      <div className="question">
      <table>
        <tbody>
          <tr>
            <td>
            <h2>{this.state.question}</h2>
            </td>
            <td>
              <h3>{this.state.targets.join("")}</h3>
            </td>
            <td>
              <p>{this.state.responses}</p>
            </td>
            <td>
              <button onClick={()=>this.props.buttonPressHandler(this.state.question,this.state.targets)}>Send to users</button>
            </td>
          </tr>
        </tbody>
      </table>




      </div>
    );
  }
}

export default QuestionEntry;
