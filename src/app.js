import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage'
import './styles/styles.scss';
import 'react-table/react-table.css';

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
        <Route component={NotFoundPage} />
      </Switch>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'));