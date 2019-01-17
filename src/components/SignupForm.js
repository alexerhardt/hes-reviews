import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signupUser } from '../actions/authActions';
import { connect } from 'react-redux';

class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
  }

  onChange = (e) => {
    console.log('onChange triggered');
    this.setState({ [e.target.name]: e.target.value });
    console.log('onChange after state', this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();


    const user = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    console.log('form submitted, user', user);

    this.props.signupUser(user);
  }

  render() {
    const activeClass = this.props.isOpen ? 'active' : '';
    return (
      <form className={'form-group auth-form' + activeClass} onSubmit={this.onSubmit}>
        <label className="form-label" htmlFor="input-example-1">Email</label>
        <input 
          className="form-input" 
          type="email" 
          placeholder="Email" 
          name="email"
          value={this.state.email}
          onChange={this.onChange}
        >
        </input>

        <label className="form-label" htmlFor="input-example-1">Password</label>
        <input 
          className="form-input" 
          type="password" 
          placeholder="Password" 
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        >
        </input>

        <label className="form-label" htmlFor="input-example-1">Password Confirmation</label>
        <input 
          className="form-input" 
          type="password" 
          placeholder="Password Confirmation" 
          name="password2"
          value={this.state.password2}
          onChange={this.onChange}
        >
        </input>

        <input className="btn btn-primary btn--auth" type="submit" value="Sign Up"></input>
      </form>
    )
  }
}

SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signupUser })(SignupForm);
