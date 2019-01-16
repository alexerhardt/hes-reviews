import React, { Component } from 'react'

class SignupForm extends Component {
  render() {
    const activeClass = this.props.isOpen ? 'active' : '';
    return (
      <div className={'auth-form' + activeClass}>
          <label class="form-label" for="input-example-1">Email</label>
          <input class="form-input" type="email" id="input-example-1" placeholder="Email"></input>
          <label class="form-label" for="input-example-1">Password</label>
          <input class="form-input" type="password" id="input-example-1" placeholder="Password"></input>
          <label class="form-label" for="input-example-1">Password Confirmation</label>
          <input class="form-input" type="password" id="input-example-1" placeholder="Password Confirmation"></input>
          <button className="btn btn-primary btn--auth">Sign Up</button>
      </div>
    )
  }
}

export default SignupForm;