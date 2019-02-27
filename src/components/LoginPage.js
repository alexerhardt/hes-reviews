import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <div id="container-loginpage">
    <Header />
    <div className="container container-inner__authpage">
      <div className="columns p-2 mt-4">
        <div className="column col-6 col-sm-12 col-mx-auto">
            <LoginForm
              isOpen
            />
        </div>
      </div>
      <div className="columns p-2">
        <div className="column col-6 col-sm-12 col-mx-auto mt-3 text-center">
            <p>Don't have an account? Sign up <Link to="/signup">here.</Link></p>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
