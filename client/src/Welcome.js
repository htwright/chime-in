import React, { Component } from 'react';
import './Welcome.css';


class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <div className="Welcome-header">
                    <p>Decision Within a Team Should Be a Conversation</p>
                    <h1>Chime-In</h1>
                </div>
                <button>Login/SignUp</button>            
            </div>
        );
    }
}

export default Welcome;