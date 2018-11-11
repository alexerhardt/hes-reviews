import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import './styles/styles.scss';

const NotFoundPage = () => (
    <div>
        404 - Not found
    </div>
)

const routes = (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'));