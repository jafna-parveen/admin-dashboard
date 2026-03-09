import { takeEvery, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";

/* ================= GET INSTITUTE ENQUIRIES ================= */

function* getInstituteEnquiriesSaga() {
  try {
    const params = {
      api: `${config.ip}/api/enquiry/institute`,
      method: "GET",
      credentials: "include"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getEnquirySuccess(res));

  } catch (error) {
    yield put(actions.getEnquiryFailure(error.message));
    toast.error(error.message || "Failed to load enquiries");
  }
}

/* ================= GET COURSE ENQUIRIES ================= */

function* getCourseEnquiriesSaga(action) {
  try {
    const { courseId } = action.payload;

    const params = {
      api: `${config.ip}/api/enquiry/course/${courseId}`,
      method: "GET",
      credentials: "include"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getEnquirySuccess(res));

  } catch (error) {
    yield put(actions.getEnquiryFailure(error.message));
    toast.error(error.message || "Failed to load course enquiries");
  }
}

/* ================= UPDATE STATUS ================= */

function* updateEnquirySaga(action) {
  try {
    const { id, status } = action.payload;

    const params = {
      api: `${config.ip}/api/enquiry/${id}`,
      method: "PUT",
      body: { status },
      credentials: "include"
    };

    const res = yield call(commonApi, params);

    yield put(actions.updateEnquirySuccess(res));
    toast.success("Status updated successfully");

  } catch (error) {
    yield put(actions.updateEnquiryFailure(error.message));
    toast.error(error.message || "Update failed");
  }
}

/* ================= DELETE ENQUIRY ================= */

function* deleteEnquirySaga(action) {
  try {

    const id = action.payload;

    const params = {
      api: `${config.ip}/api/enquiry/${id}`,
      method: "DELETE",
      credentials: "include"
    };

    yield call(commonApi, params);

    yield put(actions.deleteEnquirySuccess(id));

    toast.success("Enquiry deleted successfully");

  } catch (error) {

    yield put(actions.deleteEnquiryFailure(error.message));

    toast.error(error.message || "Delete failed");
  }
}

/* ================= WATCHER ================= */

export default function* enquiryWatcher() {

  yield takeEvery(
    actions.getInstituteEnquiry.type,
    getInstituteEnquiriesSaga
  );

  yield takeEvery(
    actions.getCourseEnquiry.type,
    getCourseEnquiriesSaga
  );

  yield takeEvery(
    actions.updateEnquiry.type,
    updateEnquirySaga
  );

  yield takeEvery(
    actions.deleteEnquiry.type,
    deleteEnquirySaga
  );
}