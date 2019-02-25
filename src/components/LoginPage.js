import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <div id="container-loginpage">
    <Header />
    <div className="container-inner__authpage">
      <div className="auth-page-form p-5">
        <LoginForm
          isOpen
        />
      </div>
    </div>
  </div>
);

export default LoginPage;
