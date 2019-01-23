import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/utils-client';

import { Provider } from 'react-redux';
import store from './store/store';

import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage'
import ReviewsPage from './components/ReviewsPage';
import WriteReviewPage from './components/WriteReviewPage';
import AccountPage from './components/AccountPage';


import 'react-table/react-table.css';
import './styles/styles.scss';

// if (localStorage.jwtToken) {
//   const decoded = jwt_decode(localStorage.jwtToken);

//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//   }
//   else {
//     setAuthToken(localStorage.jwtToken);
//     store.dispatch(setCurrentUser(decoded));
//   }
// }

const NotFoundPage = () => (
  <div>
    404 - Not found
  </div>
)

const routes = (
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/courses" component={CoursesPage}></Route>
          <Route path="/reviews/:id" component={ReviewsPage}></Route>
          <Route path="/write-review" component={WriteReviewPage}></Route>
          <Route path="/my-account" component={AccountPage}></Route>
          <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(routes, document.getElementById('app'));