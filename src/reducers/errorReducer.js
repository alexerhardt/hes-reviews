import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      console.log('err reducer, payload: ', action.payload);
      return action.payload;
    
    default:
      return state;
  }
}
