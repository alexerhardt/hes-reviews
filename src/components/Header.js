import React from 'react';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import AuthModal from './AuthModal';

/**
 * Header
 * 
 * Responsible for managing the header (aka navbar)
 * Includes mobile navigation with react-burger-menu
 * https://github.com/negomi/react-burger-menu
 */

class Header extends React.Component
{
  state = {
    menuOpen: false,
    authModalOpen: false
  }

  handleStateChange(state)
  {
    this.setState({menuOpen: state.isOpen});
  }

  closeMenu()
  {
    this.setState({menuOpen: false});
  }

  toggleMenu()
  {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  openAuthModal = () => {
    this.setState({authModalOpen: true});
  }

  closeAuthModal  = () => {
    this.setState({authModalOpen: false});
  }

  render()
  {
    return (
      <div id="container-nav" className="bg-navbar">

        <Menu 
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
          customBurgerIcon={false}
          right
        >
          <Link to="/courses" className="ml-4">See All Courses</Link>
          <Link to="/login" className="ml-4">Login</Link>
        </Menu>

        <header className="navbar px-4">
          <section className="navbar-section">
            <Link to="/" className="navbar-brand logo-desktop mr-2">HARVARD EXTENSION REVIEWS</Link>
            <Link to="/" className="navbar-brand logo-mobile mr-2">H | E | Reviews</Link>
          </section>

          <section className="navbar-section nav-desktop">
            <Link to="/courses" className="ml-4">See All Courses</Link>
            <a href="#" className="ml-4" onClick={this.openAuthModal}>Login / Sign Up</a>
          </section>

        </header>

        <i className="icon icon-menu burger" onClick={this.toggleMenu}></i>

        <AuthModal 
          isOpen={this.state.authModalOpen} 
          closeAuthModal={this.closeAuthModal}
        />
      </div>

    )
  }
}

export default Header