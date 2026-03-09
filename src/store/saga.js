import { all, call } from "redux-saga/effects";

import LoginActionWatcher from "container/LoginContainer/saga";
import ratingActionWatcher from "container/RatingContainer/saga";
import coursWatcher from "container/coursecontainer/saga";
import OrderWatcher from "container/ordercontainer/saga";
import enquiryWatcher from 'container/enquirycontainer/saga';



function* rootSaga() {

 yield all([

  call(LoginActionWatcher),
  call(ratingActionWatcher),
  call(coursWatcher),
  call(OrderWatcher),
     call(enquiryWatcher)

 ]);

}

export default rootSaga;