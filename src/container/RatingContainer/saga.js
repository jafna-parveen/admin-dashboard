import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../api';
import config from '../../config';
import * as actions from './slice';



/* GET COURSES */
function* getFeedbackSaga() {
  try {
    const params = {
      api: `${config.ip}/api/feedback/feedback`,
      method: 'GET',
      authorization: 'Bearer'
    };

    const res = yield call(commonApi, params);
  
    yield put(actions.getRatingSuccess(res));
  } catch (error) {
    yield put(actions. getRatingFailure(error.message));
    toast.error(error.message || 'Failed to load feedback');
  }
}
export default function* feedbackWatcher() {
   yield takeEvery(actions.getRating.type, getFeedbackSaga);
}