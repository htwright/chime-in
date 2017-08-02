import React, { Component } from 'react';
import {connect} from 'react-redux';
import "../LandingPage.css";

let url = 'http://localhost:8080';


export class LoginPage extends Component {
  constructor(){
    super()
    this.state = {
      formState: "get token",
      name: null,
      token: null
    }
  }

  renderPage(){
    if(this.state.formState === "get token"){
      return (
        <form onSubmit={e=>this.getToken(e)}>
        <input id="id" type="text"></input>
        <input type="submit" value="Get Code"></input>
        </form>
      )
    }else if(this.state.formState === "waiting for code"){
      return(
        <form onSubmit={e=>this.login(e)}>
          <input id="code" type="text"></input>
          <input type="submit" value="Input Code"></input>
        </form>
      )
    }else if(this.state.formState === "logged in"){
      console.log("successfully logged in!");
      return<h2>You logged in!  Your token is {this.state.token}</h2>
    }
  }

  login(e){
    e.preventDefault();
    fetch(`${url}/api/admins/login`, {
      method: 'POST',
      body: JSON.stringify({
        'name': this.state.name,
        'token': document.getElementById('code').value
      }),
      headers:{'content-type': 'application/json'}
    }).then(el=>{
      return el.json();
    }).then(el=>{
      this.setState({...this.state,token: el.token})
      this.setState({...this.state, formState: "logged in"});
      console.log(this.state)
    });
  }

  getToken(e){
    e.preventDefault();
    let userName = document.getElementById("id").value;
    console.log(userName);

    fetch(`${url}/api/admins/gettoken`, {
      method: 'POST',
      body: JSON.stringify({
        'name': userName
      }),
      headers:{'content-type': 'application/json'}
    }).then(el=>{
      this.setState({...this.state, formState: "waiting for code", name: userName});
      console.log(this.state)
    });

  }

  render(){
    return (
      <div className="loginPage">
        <h1>Login Page</h1>
        {this.renderPage()}
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(LoginPage);
