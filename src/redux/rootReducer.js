import {combineReducers, Reducer} from 'redux';
import {reducer} from './reducer';
import {addEmpoyeesData, checkSignInUser} from './userReducer';

const rootReducer = combineReducers({
  cart: reducer,
  checkSignIn: checkSignInUser,
  employeesData : addEmpoyeesData
});

export default rootReducer;
