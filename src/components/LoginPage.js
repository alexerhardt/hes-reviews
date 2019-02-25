import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <div id="container-loginpage">
    <Header />
    <div className="container-inner__loginpage">
      <LoginForm
        isOpen
      />
    </div>
  </div>
);

export default LoginPage;
