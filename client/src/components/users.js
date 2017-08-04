import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchUsers, setActiveUser} from '../actions/action';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export class Users extends Component {
  componentDidMount(){
    console.log("CURRENT user..........",this.props.currentUser);
    this.props.dispatch(fetchUsers(this.props.currentUser.id));
  }

  render() {
    const usersList = this.props.users.map((user, index) => {

      //console.log(user);
      return (
        <label key={index}>
        Name: {user[0].name}
          <input onChange={e=>this.props.dispatch(setActiveUser(e.target.value))} type="checkbox" key={index} value={JSON.stringify(user)}/><br/>
        </label>
      );
    });

    return (
      <div className="userList">
      <FormGroup  className="selectionChecklist">
         {usersList}
      </FormGroup>
      </div>
    );
  }
}

//this makes the userList available to the App component
export const mapStateToProps = state => ({
  users: state.users,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(Users);
