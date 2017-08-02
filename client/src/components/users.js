import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchUsers, setActiveUser} from '../actions/action';


export class Users extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     users: []
  //   }
  // }

  componentDidMount(){
  //  let q = this.props.dispatch(fetchUsers()).then(res=>{
  //   console.log(res);
  //   this.setState({users: res});
  //   console.log(this.state);
  //  });
    this.props.dispatch(fetchUsers());
  }

  render() {
    const usersList = this.props.users.map((user, index) => {
      
      console.log(user);
      return (
        <label>
        Name: {user[0].name}
          <input onChange={e=>this.props.dispatch(setActiveUser(e.target.value))} type="checkbox" key={index} value={JSON.stringify(user)}/><br/>
        </label>
      );
    });

    return (
      <div className="userList">
      <form  className="selectionChecklist">
         {usersList}
      </form>
      </div>
    );
  }
}

//this makes the userList available to the App component
export const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Users);
