import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const payload = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: "TEST_DONE", payload });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "TEST_DONE", payload: error });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga1() {
  yield takeLatest("TEST", workerSaga);
}
