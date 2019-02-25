import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/utils-client';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store/store';

import Header from './components/Header';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage'
import ReviewsPage from './components/ReviewsPage';
import WriteReviewPage from './components/WriteReviewPage';
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage';


import 'react-table/react-table.css';
import './styles/styles.scss';

// TODO: This here in global scope looks filthy
// Look for better ways
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Check if we should redirect home?
    // // Redirect to login
    // window.location.href = '/login';
  }
}

const NotFoundPage = () => (
  <div>
    404 - Not found
  </div>
);

const ErrorPage = (props) => {
  const { state } = props.location;
  console.log('state:', state);

  return (
    <div>
      <Header />
      <h3>{`${state.status}: ${state.statusText}`}</h3>
      <p>{`${state.detail}`}</p>
    </div>
  )
};

const routes = (
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/courses" component={CoursesPage}></Route>
          <Route path="/reviews/:id" component={ReviewsPage}></Route>
          <Route path="/write-review" component={WriteReviewPage}></Route>
          <Route path="/my-account" component={AccountPage}></Route>
          <Route path="/([0-9]{3})" component={ErrorPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('app'));