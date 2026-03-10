import { takeEvery, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";

/* ================= GET CATEGORIES ================= */

function* getCategoriesSaga() {

  try {

    const params = {
      api: `${config.ip}/api/categories`,
      method: "GET"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getCategoriesSuccess(res));

  } catch (error) {

    console.log("GET CATEGORY ERROR:", error);

    yield put(actions.getCategoriesFail(error.message));

    toast.error("Failed to load categories");

  }

}


/* ================= CREATE CATEGORY ================= */

function* createCategorySaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/category`,
      method: "POST",
      authorization: "Bearer",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: action.payload
    };

    const res = yield call(commonApi, params);

    yield put(actions.createCategorySuccess(res));

    toast.success("Category created successfully");

    yield put(actions.getCategories());

  } catch (error) {

    console.log("CREATE CATEGORY ERROR:", error);

    yield put(actions.createCategoryFail(error.message));

    toast.error("Category creation failed");

  }

}


/* ================= UPDATE CATEGORY ================= */

function* updateCategorySaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/category/${action.payload.id}`,
      method: "PUT",
      authorization: "Bearer",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: action.payload.data
    };

    const res = yield call(commonApi, params);

    yield put(actions.updateCategorySuccess(res));

    toast.success("Category updated");

    yield put(actions.getCategories());

  } catch (error) {

    console.log("UPDATE CATEGORY ERROR:", error);

    yield put(actions.updateCategoryFail(error.message));

    toast.error("Update failed");

  }

}


/* ================= DELETE CATEGORY ================= */

function* deleteCategorySaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/category/${action.payload}`,
      method: "DELETE",
      authorization: "Bearer"
    };

    const res = yield call(commonApi, params);

    yield put(actions.deleteCategorySuccess(res));

    toast.success("Category deleted");

    yield put(actions.getCategories());

  } catch (error) {

    console.log("DELETE CATEGORY ERROR:", error);

    yield put(actions.deleteCategoryFail(error.message));

    toast.error("Delete failed");

  }

}


/* ================= TOGGLE STATUS ================= */

function* toggleStatusSaga(action) {

  try {

    const params = {
      api: `${config.ip}/api/category/status/${action.payload}`,
      method: "PATCH",
      authorization: "Bearer"
    };

    const res = yield call(commonApi, params);

    yield put(actions.toggleStatusSuccess(res));

    toast.success("Status updated");

    yield put(actions.getCategories());

  } catch (error) {

    console.log("STATUS ERROR:", error);

    yield put(actions.toggleStatusFail(error.message));

    toast.error("Status update failed");

  }

}


/* ================= WATCHER ================= */

export default function* categoryWatcher() {

  yield takeEvery(actions.getCategories.type, getCategoriesSaga);

  yield takeEvery(actions.createCategory.type, createCategorySaga);

  yield takeEvery(actions.updateCategory.type, updateCategorySaga);

  yield takeEvery(actions.deleteCategory.type, deleteCategorySaga);

  yield takeEvery(actions.toggleStatus.type, toggleStatusSaga);

}