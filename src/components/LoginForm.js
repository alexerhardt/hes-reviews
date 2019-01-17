import React, { Component } from 'react'

class LoginForm extends Component {
  render() {
    const activeClass = this.props.isOpen ? 'active' : '';
    return (
      <form className={'form-group auth-form' + activeClass}>
          <label className="form-label" htmlFor="input-example-1">Email</label>
          <input className="form-input" type="email" id="input-example-1" placeholder="Email"></input>
          <label className="form-label" htmlFor="input-example-1">Password</label>
          <input className="form-input" type="password" id="input-example-1" placeholder="Password"></input>
          <input className="btn btn-primary btn--auth" type="submit" value="Log In"></input>
      </form>
    )
  }
}

export default LoginForm;