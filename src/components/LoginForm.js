import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../actions/authActions';
import { isEmptyObject } from '../../utils/utils-global';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    waiting: false,
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({ waiting: true });

    this.props.loginUser(user);
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.isOpen) {
      this.setState({
        email: '',
        password: '',
        waiting: false,
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: this.props.errors,
        waiting: false,
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <form
        // TODO: Review this, don't think isOpen is right
        className={classnames('form-group auth-form', {
          active: this.props.isOpen,
          'has-error': !isEmptyObject(errors),
        })}
        onSubmit={this.onSubmit}
      >
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && <p className="form-input-hint">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>

        {/* TODO: Abstract this into LoadButton component */}
        <input
          className={classnames('btn btn-primary btn--auth', {
            loading: this.state.waiting,
          })}
          type="submit"
          value="Log In"
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  isOpen: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser },
)(LoginForm);
