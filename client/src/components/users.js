import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {fetchUsers} from '../actions/action';


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
          <ListGroupItem key={index}> {user[0].name} </ListGroupItem>
        )
      })

    return (
      <div className="userList">
        <ListGroup> {usersList} </ListGroup>
      </div>
    );
  }
}

//this makes the userList available to the App component
export const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Users);
