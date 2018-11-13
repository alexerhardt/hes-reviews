import React from 'react';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';

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
    menuOpen: false
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

  render()
  {
    return (
      <div id="container-nav">

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
            <Link to="/" className="navbar-brand mr-2">HARVARD EXTENSION REVIEWS</Link>
          </section>

          <section className="navbar-section nav-desktop">
            <Link to="/courses" className="ml-4">See All Courses</Link>
            <Link to="/login" className="btn btn-primary ml-4">Login</Link>
          </section>

        </header>

        <i class="icon icon-menu burger" onClick={() => this.toggleMenu()}></i>

      </div>
    )
  }
}

export default Header