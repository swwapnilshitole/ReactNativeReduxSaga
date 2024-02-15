import {SIGN_IN_USER_DETAILS, ADD_EMPLOYEES} from './constant';

const initialState = {
  userSignIn: false,
  employees : []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER_DETAILS:
      return {...state, userSignIn: action.data};

    case ADD_EMPLOYEES:
      return {...state, employees: action.data};
    default:
      return state;
  }
};
