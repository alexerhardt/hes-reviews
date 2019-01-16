import React, { Component } from 'react'

class LoginForm extends Component {
  render() {
    const activeClass = this.props.isOpen ? 'active' : '';
    return (
      <div className={'auth-form' + activeClass}>
          <label class="form-label" for="input-example-1">Email</label>
          <input class="form-input" type="email" id="input-example-1" placeholder="Email"></input>
          <label class="form-label" for="input-example-1">Password</label>
          <input class="form-input" type="password" id="input-example-1" placeholder="Password"></input>
          <button className="btn btn-primary btn--auth">Login</button>
      </div>
    )
  }
}

export default LoginForm;