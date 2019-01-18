import React, { Component } from 'react'
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signupUser, loginUser } from '../actions/authActions';

class AuthModal extends Component {

  state = {
    isLoginOpen: true,
    errors: {}
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      console.log('AuthModal received props: is authenticated');
      this.setState({ errors: 'Logging you in...'});

      setTimeout(() => {
        this.props.closeAuthModal();
      }, 6000);
    }
    else {
      console.log('AuthModal received props: is NOT authenticated');
    }
  }

  handleSwitchTabs = (prev) => {
    this.setState({ isLoginOpen: !prev.isLoginOpen })
  }

  render() {
    const modalActiveClass = this.props.isOpen ? ' active' : '';
    const loginActiveClass = this.state.isLoginOpen ? ' active' : '';
    const signupActiveClass = !this.state.isLoginOpen ? ' active' : '';

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
                  <a href="#" onClick={() => this.handleSwitchTabs(this.state)}>Login</a>
                </li>
                <li className={"tab-item" + signupActiveClass}>
                  <a href="#" onClick={() => this.handleSwitchTabs(this.state)}>Signup</a>
                </li>
              </ul>

              <LoginForm isOpen={this.state.isLoginOpen} />
              <SignupForm isOpen={!this.state.isLoginOpen} />

             </div>
          </div>

          <div className="modal-footer">
            {
              this.state.message &&
              <div className="toast toast-success">{'Everything went swimmingly'}</div>
            }
         </div>

        </div>
      </div>
    )
  }
}

AuthModal.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signupUser, loginUser })(AuthModal);





