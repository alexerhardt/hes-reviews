import React, { Component } from 'react'
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signupUser, loginUser, clearErrors } from '../actions/authActions';
import { isEmpty } from '../utils/utils-client';

class AuthModal extends Component {

  state = {
    isLoginOpen: true,
    message: {} 
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('AuthModal componentWillReceiveProps');
    if (nextProps.message.activeMessage) {
      this.setState({ message: nextProps.message });
    }

    if (nextProps.auth.isAuthenticated) {
      console.log('AuthModal received props: is authenticated');

      setTimeout(() => {
        this.props.closeAuthModal();
      }, 3000);
    }
  }

  handleSwitchTabs = (prev) => {
    console.log('handle switch tabs called');
    this.setState({ isLoginOpen: !prev.isLoginOpen });
  }

  toggleTabs = () => {
    this.props.clearErrors();
    const prev = this.state.isLoginOpen;
    this.setState({ isLoginOpen: !prev });
  }

  render() {
    const modalActiveClass = this.props.isOpen ? ' active' : '';
    const loginActiveClass = this.state.isLoginOpen ? ' active' : '';
    const signupActiveClass = !this.state.isLoginOpen ? ' active' : '';

    const message = this.state.message;

    return (
      <div className={'modal' + modalActiveClass} id="auth-modal">
        <a href="#close" 
           className="modal-overlay" 
           aria-label="Close" 
           onClick={this.props.closeAuthModal}
        >
        </a>

        <div className="modal-container">

          <div className="modal-header">
            <a 
              href="#close" 
              className="btn btn-clear float-right" 
              aria-label="Close"
              onClick={this.props.closeAuthModal}
            >
            </a>

          </div>

          <div className="modal-body">
            <div className="content">
              <ul className="tab tab-block">
                <li className={"tab-item" + loginActiveClass} >
                  <a href="#" onClick={() => this.toggleTabs()}>Login</a>
                </li>
                <li className={"tab-item" + signupActiveClass}>
                  <a href="#" onClick={() => this.toggleTabs()}>Signup</a>
                </li>
              </ul>

              <LoginForm 
                isOpen={this.state.isLoginOpen} 
              />
              <SignupForm 
                isOpen={!this.state.isLoginOpen} 
                switchTabs={this.toggleTabs}
              />

             </div>
          </div>

          <div className="modal-footer">
            {
              message.activeMessage &&
              <div className={"toast " + message.class}>
                {message.text}
              </div>
            }
         </div>

        </div>
      </div>
    )
  }
}

AuthModal.propTypes = {
  auth: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  message: state.message
});

export default connect(mapStateToProps, { signupUser, loginUser, clearErrors })(AuthModal);





