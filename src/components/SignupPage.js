import React from 'react';
import Header from './Header';
import SignupForm from './SignupForm';

const SignupPage = () => (
  <div id="container-loginpage">
    <Header />
    <div className="container-inner__authpage">
      <div className="auth-page-form p-5">
        <SignupForm isOpen />
      </div>
    </div>
  </div>
);

export default SignupPage;
