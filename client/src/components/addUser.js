import React, {Component} from 'react'
import {addUser} from '../actions/action';
import {connect} from 'react-redux';

export class AddUser extends Component {
  constructor(props) {
    super(props)
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd(event){
    event.preventDefault();
    const userInput = {
      name: this.userName.value,
      phonenumber: this.userNumber.value,
      email: this.userEmail.value,
      preferred: event.target.preferred.value
    }

  // const userInput = this.userName.value;
    console.log(userInput);
    this.form.reset();
    return this.props.dispatch(addUser(userInput))
  }

  render() {
    return (
      <form ref={form => this.form = form} className="adduserForm" onSubmit={e => this.onAdd(e)}>
        <label htmlFor="userName">Name</label>
        <input type="text" className="userName" placeholder="John Doe" required
                ref={input => this.userName = input} />
        <label htmlFor="Phone #">Phone #</label>
        <input type="number" className="userNumber" placeholder="15555555"
                ref={input => this.userNumber = input} />
        <label htmlFor="email">Email</label>
        <input type="email" className="userEmail" placeholder="jdoe@gmail.com"
                ref={input => this.userEmail = input} />
          <div className="form-group">
          <label htmlFor="preferred">Preference:</label>
          <select className="form-control" id="preferred">
            <option>Text</option>
            <option>Email</option>
          </select>
        </div>
        {/* <div className="preference">
  <label><input type="radio" name="preference"/>Text</label>
  <label><input type="radio" name="preference"/>Email</label>
</div> */}
        <button type="submit">Add User</button>
      </form>

    )
  }
}

export const mapStateToProps = state => ({
    users: state.users
 })

export default connect(mapStateToProps)(AddUser);
