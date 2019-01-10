import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage'
import ReviewsPage from './components/ReviewsPage';
import WriteReviewPage from './components/WriteReviewPage';
import AccountPage from './components/AccountPage';

import 'react-table/react-table.css';
import './styles/styles.scss';

const NotFoundPage = () => (
  <div>
    404 - Not found
  </div>
)

const routes = (
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
)

ReactDOM.render(routes, document.getElementById('app'));