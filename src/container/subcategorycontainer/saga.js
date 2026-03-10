import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import commonApi from "../api";
import config from "../../config";
import * as actions from "./slice";

/* =========================
   GET ALL SUBCATEGORIES
========================= */

function* getSubCategoriesSaga() {
  try {
    const params = {
      api: `${config.ip}/api/subcategories`,
      method: "GET"
    };

    const res = yield call(commonApi, params);

    yield put(actions.getSubCategoriesSuccess(res));

  } catch (error) {

    yield put(actions.getSubCategoriesFail(error.message));
    toast.error("Failed to load subcategories");

  }
}

/* =========================
   CREATE SUBCATEGORY
========================= */

function* createSubCategorySaga(action) {
  try {

    const params = {
      api: `${config.ip}/api/add-subcategory`,
      method: "POST",
      authorization: "Bearer",
      body: action.payload,
      isFormData: true
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actions.createSubCategorySuccess(res));
      toast.success("Subcategory created successfully");
    }

  } catch (error) {

    yield put(actions.createSubCategoryFail(error.message));
    toast.error("Creation failed");

  }
}

/* =========================
   WATCHER
========================= */

export default function* subCategoryWatcher() {

  // fetch list
  yield takeEvery(
    actions.getSubCategories.type,
    getSubCategoriesSaga
  );

  // create (prevent duplicates)
  yield takeLatest(
    actions.createSubCategory.type,
    createSubCategorySaga
  );

}