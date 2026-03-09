import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../api';
import appConfig from '../../config';
import * as actionType from './slice';

// ================= CREATE ORDER =================
function* createOrder(action) {
  const orderReq = {
    student: action.payload.student,
    course: action.payload.course,
    institution: action.payload.institution,
    price: action.payload.price,
    status: "pending"
  };

  try {
    const params = {
      api: `${appConfig.ip}/api/createorder`,
      method: 'POST',
      body: JSON.stringify(orderReq)
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.createOrderSuccess(res.data.data));
      yield call(toast.success, 'Order created successfully', { autoClose: 3000 });
    }
  } catch (error) {
    yield put(
      actionType.createOrderFail({
        message: error.message || 'Failed to create order',
        status: 500
      })
    );
    yield call(toast.error, 'Order creation failed', { autoClose: 3000 });
  }
}

// ================= GET INSTITUTION ORDERS =================
function* getInstitutionOrders(action) {
  try {
    const params = {
      api: `${appConfig.ip}/api/getinstiorder/${action.payload}`,
      method: 'GET'
    };

    const res = yield call(commonApi, params);

    yield put(actionType.getInstitutionOrdersSuccess(res.data));
  } catch (error) {
    yield put(
      actionType.getInstitutionOrdersFail({
        message: error.message,
        status: 500
      })
    );
  }
}

// ================= UPDATE ORDER =================
function* updateOrder(action) {
  try {
    const params = {
      api: `${appConfig.ip}/api/updateorder/${action.payload.id}`,
      method: "PUT",
      body: JSON.stringify(action.payload.updateData)
    };

    const res = yield call(commonApi, params);

    if (res) {
      yield put(actionType.updateOrderSuccess(res.data.data));
      yield call(toast.success, "Order updated successfully", { autoClose: 3000 });
    }
  } catch (error) {
    yield put(actionType.updateOrderFail({ message: error.message }));
    yield call(toast.error, "Order update failed", { autoClose: 3000 });
  }
}


// ================= WATCHER =================
export default function* OrderWatcher() {
  yield takeEvery(actionType.createOrder.type, createOrder);
  yield takeEvery(actionType.getInstitutionOrders.type, getInstitutionOrders);
  yield takeEvery(actionType.updateOrder.type, updateOrder);
 
}
