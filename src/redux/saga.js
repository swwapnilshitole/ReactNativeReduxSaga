import {takeLatest, all} from 'redux-saga/effects';
import {SIGN_IN_USER_DETAILS, ADD_EMPLOYEES} from './constant';

function* setUserSignIn({action, data}) {
  try {
  } catch (error) {
    console.log('eror fetching user data', error);
  }
}

function* SagaData() {
  yield takeLatest(SIGN_IN_USER_DETAILS, setUserSignIn);
  yield all(ADD_EMPLOYEES, setUserSignIn);
}
export default SagaData;
