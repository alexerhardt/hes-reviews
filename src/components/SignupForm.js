import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signupUser, clearAllMessages } from '../actions/authActions';
import { connect } from 'react-redux';
import classnames from 'classnames';

class SignupForm extends Component {
  state = {
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.signupUser(user, this.props.switchTabs);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('signupForm receives props: ', nextProps);
    if (!nextProps.isOpen) {
      this.setState({ email: '', password: '', password2: '' });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form 
        className={classnames('form-group auth-form', {
          'active': this.props.isOpen
        })}
        onSubmit={this.onSubmit}
      >
        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            className={classnames('form-input', {
              'is-error': errors.email
            })}
            type="email" 
            placeholder="Email" 
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          >
          </input>
          {
            errors.email &&
            <p className="form-input-hint">{errors.email}</p>
          }
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            className={classnames('form-input', {
              'is-error': errors.password
            })}
            type="password" 
            placeholder="Password" 
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          >
          </input>
          {
            errors.password &&
            <p className="form-input-hint">{errors.password}</p>
          }
        </div>

        <div className="form-group">
          <label className="form-label">Password Confirmation</label>
          <input 
            className={classnames('form-input', {
              'is-error': errors.password2
            })}
            type="password" 
            placeholder="Password Confirmation" 
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          >
          </input>
          {
            errors.password2 &&
            <p className="form-input-hint">{errors.password2}</p>
          }
        </div>

        <input className="btn btn-primary btn--auth" type="submit" value="Sign Up"></input>
      </form>
    )
  }
}

SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
  clearAllMessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { signupUser, clearAllMessages })(SignupForm);
