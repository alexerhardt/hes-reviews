import { SET_MESSAGE } from '../actions/types';
import { isEmpty } from '../utils/utils-client';

const initialState = {
  activeMessage: false,
  text: '',
  class: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        activeMessage: !isEmpty(action.payload),
        text: action.payload.text,
        class: action.payload.class,
      };

    default:
      return state;
  }
}
