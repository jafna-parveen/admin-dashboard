import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../api';
import config from '../../config';
import * as actions from './slice';

/* ---------------- CREATE COURSE ---------------- */
function* addCourseSaga(action) {
  console.log("==action", action.payload);
  
  try {
    const params = {
      api: `${config.ip}/api/institute/course`,
      method: 'POST',
      authorization: 'Bearer',
      body: action.payload
    };

    const res = yield call(commonApi, params);
    yield put(actions.addCourseSuccess(res.data));
    toast.success('Course added successfully');
  } catch (error) {
    yield put(actions.addCourseFail(error.message));
    toast.error(error.message || 'Add course failed');
  }
}

/* ---------------- GET COURSES ---------------- */

function* getCoursesSaga(action) {
  try {
    const params = {
      api: `${config.ip}/api/institute/course`,
      method: 'GET',
      authorization: 'Bearer'
    };

    const res = yield call(commonApi, params);


    yield put(actions.getCoursesSuccess(res.data));
  } catch (error) {
    yield put(actions.getCoursesFail(error.message));
    toast.error(error.message || 'Failed to load courses');
  }
}

/* ---------------- UPDATE COURSE ---------------- */
function* updateCourseSaga(action) {
  console.log("aaa",action.payload.data);
  
  try {
    const {id ,form } = action.payload
 
    const params = {
      api: `${config.ip}/api/update/${id}`,
      method: 'PUT',
      authorization: 'Bearer',
      body: form
      
    };

    const res = yield call(commonApi, params);
    yield put(actions.updateCourseSuccess(res.data));
    toast.success('Course updated');
  } catch (error) {
    yield put(actions.updateCourseFail(error.message));
    toast.error(error.message || 'Update failed');
  }
}

/* ---------------- DELETE COURSE ---------------- */
function* deleteCourseSaga(action) {
  try {
    const params = {
      api: `${config.ip}/api/institute/course/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer'
    };

    yield call(commonApi, params);
    yield put(actions.deleteCourseSuccess(action.payload));
    toast.success('Course deleted');
  } catch (error) {
    yield put(actions.deleteCourseFail(error.message));
    toast.error(error.message || 'Delete failed');
  }
}

/* ---------------- GET CATEGORIES ---------------- */
function* getCategoriesSaga() {
  try {
    const params = {
      api: `${config.ip}/api/categories`,
      method: 'GET',
      authorization: 'Bearer'
    };

    const res = yield call(commonApi, params);
    yield put(actions.getCategoriesSuccess(res.data));
  } catch (error) {
    yield put(actions.getCategoriesFail(error.message));
    toast.error(error.message || 'Failed to load categories');
  }
}

/* ---------------- GET SUBCATEGORIES ---------------- */
function* getSubCategoriesSaga() {
  try {
    const params = {
      api: `${config.ip}/api/subcategories`,
      method: 'GET',
      authorization: 'Bearer'
    };

    const res = yield call(commonApi, params);
    yield put(actions.getSubCategoriesSuccess(res.data));
  } catch (error) {
    yield put(actions.getSubCategoriesFail(error.message));
    toast.error(error.message || 'Failed to load subcategories');
  }
}

/* ---------------- WATCHER ---------------- */
export default function* courseWatcher() {
  yield takeEvery(actions.addCourse.type, addCourseSaga);
  yield takeEvery(actions.getCourses.type, getCoursesSaga);
  yield takeEvery(actions.updateCourse.type, updateCourseSaga);
  yield takeEvery(actions.deleteCourse.type, deleteCourseSaga);

  // New watchers for categories/subcategories
  yield takeEvery(actions.getCategories.type, getCategoriesSaga);
  yield takeEvery(actions.getSubCategories.type, getSubCategoriesSaga);
}