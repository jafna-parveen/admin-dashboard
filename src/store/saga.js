import { all, call } from "redux-saga/effects";

import LoginActionWatcher from "container/LoginContainer/saga";
import subCategoryWatcher from "container/subcategorycontainer/saga";
import institutionWatcher from "container/institutecontainer/saga";
import categoryWatcher from "container/categorycontainer/saga";
import supportWatcher from "container/supportcontainer/saga";

function* rootSaga() {

  yield all([
    call(LoginActionWatcher),
  call(subCategoryWatcher),
    call(institutionWatcher),   // ✅ changed
   call(categoryWatcher),
   call(supportWatcher)
  ]);

}

export default rootSaga;