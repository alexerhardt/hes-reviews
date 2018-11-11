import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component
{
    render()
    {
        return (
            <header className="navbar p-4">
                <section className="navbar-section">
                    <Link to="/" className="navbar-brand mr-2">Harvard Extension Reviews</Link>
                </section>
                <section className="navbar-section">
                    <Link to="/courses" className="ml-4">See All Courses</Link>
                    <Link to="/login" className="btn btn-primary ml-4">Login</Link>
                </section>
            </header>
        )
    }
}

export default Header