import {SIGN_IN_USER_DETAILS, ADD_EMPLOYEES} from './constant';

const initialState = {
  userSignIn: false,
  employees: [],
};

export const checkSignInUser = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER_DETAILS:
      return {...state, userSignIn: action.data};
    default:
      return state;
  }
};

export const addEmpoyeesData = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEES:
      return {...state, employees: action.data};
    default:
      return state;
  }
};
