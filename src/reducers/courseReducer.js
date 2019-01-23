import { GET_COURSES, UPDATE_COURSE } from '../actions/types' ;

const coursesDefaultState = [];

export default (state = coursesDefaultState, action) => {
  switch (action.type) 
  {
    case GET_COURSES:
      return action.payload;

    case UPDATE_COURSE:
      return state.map((course) => {
        if (course.id === action.id) {
          return {
            ...course,
            ...action.updates
          }
        }
        else {
          return course;
        }
      });

    default:
      return state;
  }
};
