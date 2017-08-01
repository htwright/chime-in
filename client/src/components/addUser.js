import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class AddUser extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.history.push(`/adduser`)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Add User</button>
      </div>
    )
  }
}
