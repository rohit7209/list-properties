import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { CONSTANTS } from './../../../constants';
import { GV_REQUEST_NEXT_PROPERTIES } from './constants';
import { requestNextPropertiesDone } from './actions';

function fetchNextProperties(payload) {
  return axios({
    method: 'GET',
    url: CONSTANTS.fetchPropertiesAPI,
    data: {
      page_number: payload.pageNumber || 1,
      count: payload.count || 25,
    }
  });
}

function* requestNextPropertiesFlow(action) {
  try {
    const response = yield call(fetchNextProperties, action.payload);
    const payload = response.data;
    yield put(requestNextPropertiesDone({ ...payload, append: !!action.payload.pageNumber, sort: action.payload.sort }));
  } catch (error) {
    yield put(requestNextPropertiesDone(error));
  }
}

export function* GridViewWatcher() {
  yield takeLatest(GV_REQUEST_NEXT_PROPERTIES, requestNextPropertiesFlow);
}
