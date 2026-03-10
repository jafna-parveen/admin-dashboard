import { takeEvery, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";

/* ===== GET INSTITUTION PROFILE ===== */

function* getInstitutionSaga() {
  try {

    const params = {
      api: `${config.ip}/api/institution/profile`,
      method: "GET",
      authorization: "Bearer"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getInstitutionSuccess(res));

  } catch (error) {
    yield put(actions.getInstitutionFail(error.message));
    toast.error("Failed to load institution profile");
  }
}

/* ===== UPDATE INSTITUTION ===== */

function* updateInstitutionSaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/institution/update`,
      method: "PUT",
      authorization: "Bearer",
      body: action.payload
    };

    const res = yield call(commonApi, params);

    yield put(actions.updateInstitutionSuccess(res));
    toast.success("Institution profile updated");

  } catch (error) {
    yield put(actions.updateInstitutionFail(error.message));
    toast.error("Update failed");
  }
}

/* ===== WATCHER ===== */

export default function* institutionWatcher() {

  yield takeEvery(actions.getInstitution.type, getInstitutionSaga);
  yield takeEvery(actions.updateInstitution.type, updateInstitutionSaga);

}