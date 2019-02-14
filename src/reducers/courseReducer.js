import { GET_COURSES, UPDATE_COURSE } from '../actions/types' ;

const coursesDefaultState = [];

export default (state = coursesDefaultState, action) => {
  switch (action.type) 
  {
    case GET_COURSES:
      return action.payload;

    case UPDATE_COURSE:
      console.log('UPDATE_COURSE called, course: ', action.payload);
    
      return state.map((course) => {
        if (course.id === action.id) {
          return {
            ...course,
            ...action.payload
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
