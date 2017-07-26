import React, { Component } from 'react';
import './Welcome.css';
import LoginForm from 'loginPage';

console.log(Login);


class Login extends Component {
    render() {
        return (
            <div className="Welcome">
                <div className="Welcome-header">
                    <p>Decision Within a Team Should Be a Conversation</p>
                    <h1>Chime-In</h1>
                </div>

            </div>
        );
    }
}

export default Login;
