
import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

function* login(action) {

  const loginReq = {
    email: action.payload.email,
    password: action.payload.password
  };

  try {
    const params = {
    api: `${appConfig.ip}/api/loginadmin`,
      method: 'POST',
      successAction: actionType.loginSuccess,
      failAction: actionType.loginFail,
      authorization: null,
      body: loginReq
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield call(toast.success, 'Login successful', { autoClose: 3000 });

      // ✅ FIXED HERE
      yield put(actionType.userMe());

      yield call(action.payload.navigate, '/dashboard');
    } else {
      yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
    }
  } catch (error) {
    console.error('Login failed:', error);
    yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
  }
}

function* userMe() {

  try {
    const params = {
      api: `${appConfig.ip}/api/me`,
      method: 'GET',
      successAction: actionType.userMeSuccess,
      failAction: actionType.userMeFail,
      authorization: `Bearer`,


    };

    const res = yield call(commonApi, params);

    yield put(actionType.userMeSuccess(res));

  } catch (error) {
    console.error('Fetch User failed:', error);
    yield put(
      actionType.userMeFail({
        message: error.message || 'Failed to fetch user.',
        status: error.response?.status || 500
      })
    );
    yield call(toast.error, 'Failed to load user details.', { autoClose: 3000 });
  }
}
function* updateProfile(action) {
  try {
    const params = {
      api: `${appConfig.ip}/api/update`,
      method: "PUT",
      body: action.payload,
      authorization: "Bearer",
    };

    const res = yield call(commonApi, params);

    yield put(actionType.updateProfileSuccess(res));

    // ✅ ADD THIS
    yield put(actionType.userMe());

    yield call(toast.success, "Profile updated successfully");
  } catch (error) {
    yield put(actionType.updateProfileFail());
    yield call(toast.error, "Profile update failed");
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery(actionType.userLogin, login);
  yield takeEvery(actionType.userMe, userMe);
  yield takeEvery(actionType.updateProfile, updateProfile);
}
