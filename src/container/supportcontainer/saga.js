import { call, put, takeEvery } from "redux-saga/effects";
import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";


/* ================= GET SUPPORT REQUESTS ================= */

function* getRequests() {

  try {

    const params = {
      api: `${config.ip}/api/support-requests`,
      method: "GET",
      authorization: "Bearer"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getSupportRequestsSuccess(res));

  } catch (error) {

    console.log("Fetch support error:", error);

    yield put(actions.getSupportRequestsFail());

  }

}


/* ================= REPLY SUPPORT ================= */

function* replySaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/support-reply/${action.payload.id}`,
      method: "POST",
      authorization: "Bearer",
      body: { reply: action.payload.reply }
    };

    yield call(commonApi, params);

    yield put(actions.replySupportSuccess());

    yield put(actions.getSupportRequests());

  } catch (error) {

    console.log("Reply error:", error);

  }

}


/* ================= DELETE SUPPORT ================= */

function* deleteSaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/support/${action.payload}`,
      method: "DELETE",
      authorization: "Bearer"
    };

    yield call(commonApi, params);

    yield put(actions.deleteSupportSuccess());

    yield put(actions.getSupportRequests());

  } catch (error) {

    console.log("Delete error:", error);

  }

}


/* ================= WATCHER ================= */

export default function* supportWatcher() {

  yield takeEvery(actions.getSupportRequests.type, getRequests);

  yield takeEvery(actions.replySupport.type, replySaga);

  yield takeEvery(actions.deleteSupport.type, deleteSaga);

}