import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../utils/utils-client';
import { logoutUser } from '../actions/authActions';

const initialState = {};

// Token expiration middleware
// https://stackoverflow.com/a/44986487/6854595
const checkTokenExpiration = store => next => action => {
  const token = localStorage.jwtToken;
  console.log('checking token expiration for token: ', token);
  if (token && jwt_decode(token).exp < Date.now() / 1000) {
    console.log('token has expired, deleting it');
    next(action);
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    store.dispatch(logoutUser());
  }
  next(action);
};

const middleware = [thunk, checkTokenExpiration];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  ),
);

export default store;
