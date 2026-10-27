
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

    if (res && res.token) {
      localStorage.setItem('token', res.token);
      if (res.admin) {
        localStorage.setItem('userDtls', JSON.stringify(res.admin));
      }
      yield put(actionType.loginSuccess(res));
      yield call(toast.success, 'Login successful', { autoClose: 3000 });
      yield call(action.payload.navigate, '/dashboard');
    } else {
      yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
    }
  } catch (error) {
    console.error('Login failed:', error);
    yield put(actionType.loginFail(error));
    yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
  }
}

function* userMe() {
  try {
    const token = localStorage.getItem('token');
    const params = {
      api: `${appConfig.ip}/api/me`,
      method: 'GET',
      authorization: token ? 'Bearer' : null,
      token: token
    };

    const res = yield call(commonApi, params);
    if (res) {
      yield put(actionType.userMeSuccess(res));
    }
  } catch (error) {
    console.error('Fetch User failed:', error);
    yield put(
      actionType.userMeFail({
        message: error.message || 'Failed to fetch user.',
        status: error.response?.status || 500
      })
    );
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
