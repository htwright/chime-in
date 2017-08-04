import React, { Component } from 'react';
import {connect} from 'react-redux';
import './LandingPage.css'


let url = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production'){
  //do not include a slash at the end!
  url = 'https://chime-in.herokuapp.com';
}

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
        <nav className="navbar navbar-default navbar-static-top navbar-inverse"> 
          <div className="container">
            <p className="navbar-text">Simmetric</p>
          </div>
        </nav>
        <div className="container-fluid video-header">
        <video autoPlay loop>
          <source src="./res/video/hero_video.mp4"/>
        </video>
        </div>
        <div className="overlay">
          <div classname="container main-page">
            <h1>Simmetric</h1>
            <h2>Keeping you and your team connected and on the same page</h2>
            <div className="hero-about-links">
              <button className="btn btn-primary">
                <a href={'/api/auth/google'}>Login with Google</a>
              </button>
              {/* {this.renderPage()} */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(LoginPage);
