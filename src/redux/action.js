import {SIGN_IN_USER_DETAILS, ADD_EMPLOYEES} from './constant';

export const setSignInUserData = data => {
  return {
    type: SIGN_IN_USER_DETAILS,
    data: data,
  };
};

export const addEmployee = (data) => ({
  type: ADD_EMPLOYEES,
  data: data,
});
