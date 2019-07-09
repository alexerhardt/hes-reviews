import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import AuthModal from './AuthModal';
import { logoutUser, clearAllMessages } from '../actions/authActions';

/**
 * Header
 *
 * Responsible for managing the header (aka navbar)
 * Includes mobile navigation with react-burger-menu
 * https://github.com/negomi/react-burger-menu
 */

class Header extends React.Component {
  state = {
    menuOpen: false,
    authModalOpen: false,
    isAuthenticated: this.props.auth.isAuthenticated,
  };

  componentWillReceiveProps(nextProps) {
    console.log(
      'Header componentWillReceiveProps, is auth:',
      nextProps.auth.isAuthenticated,
    );
    this.setState({ isAuthenticated: nextProps.auth.isAuthenticated });
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  openAuthModal = () => {
    this.setState({ authModalOpen: true });
  };

  closeAuthModal = () => {
    this.props.clearAllMessages();
    this.setState({ authModalOpen: false });
  };

  logOut = () => {
    this.props.logoutUser();
  };

  nonAuthNav = (
    <div>
      <Link to="/courses" className="ml-4">
        See All Courses
      </Link>
      <a href="#" className="ml-4" onClick={this.openAuthModal}>
        Login / Sign Up
      </a>
    </div>
  );

  authNav = (
    <div>
      <Link to="/write-review">Write Review</Link>
      <Link to="/courses" className="ml-4">
        See All Courses
      </Link>
      <Link to="/my-account" className="ml-4">
        My Account
      </Link>
      <a href="#" className="ml-4" onClick={this.logOut}>
        Logout
      </a>
    </div>
  );

  render() {
    // const isAuthenticated = this.props.auth.isAuthenticated;
    const isAuthenticated = this.state.isAuthenticated;
    console.log('Header render, isAuthenticated: ', isAuthenticated);

    return (
      <div id="container-nav" className="bg-navbar">
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          customBurgerIcon={false}
          right
        >
          {/* <Link to="/courses" className="ml-4">See All Courses</Link>
          <Link to="/login" className="ml-4">Login</Link> */}
          {isAuthenticated ? this.authNav : this.nonAuthNav}
        </Menu>

        <header className="navbar px-4">
          <section className="navbar-section">
            <Link to="/" className="navbar-brand logo-desktop mr-2">
              HARVARD EXTENSION REVIEWS
            </Link>
            <Link to="/" className="navbar-brand logo-mobile mr-2">
              H | E | Reviews
            </Link>
          </section>

          <section className="navbar-section nav-desktop">
            {/* <Link to="/courses" className="ml-4">See All Courses</Link>
            <a href="#" className="ml-4" onClick={this.openAuthModal}>Login / Sign Up</a> */}
            {isAuthenticated ? this.authNav : this.nonAuthNav}
          </section>
        </header>

        <i className="icon icon-menu burger" onClick={this.toggleMenu} />

        <AuthModal
          isOpen={this.state.authModalOpen}
          closeAuthModal={this.closeAuthModal}
        />
      </div>
    );
  }
}

Header.propTypes = {
  clearAllMessages: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

// export default Header
export default connect(
  mapStateToProps,
  { logoutUser, clearAllMessages },
)(Header);
