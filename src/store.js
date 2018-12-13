
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

// gathering all the reducers 
const reducerContext = require.context('./', true, /reducers\.js$/);
const reducersList = {};
reducerContext.keys().forEach(reducers => {
  Object.keys(reducerContext(reducers)).forEach(reducerName => {
    if (reducersList[reducerName]) {
      throw Error(`Duplicate reducer name [${reducerName}]`);
    } else reducersList[reducerName] = reducerContext(reducers)[reducerName]
  })
});

// gathering all the sagas 
const sagaContext = require.context('./', true, /sagas\.js$/);
const sagaList = [];
sagaContext.keys().forEach(sagas => {
  Object.keys(sagaContext(sagas)).forEach(sagaName => {
    sagaList.push(sagaContext(sagas)[sagaName]());
  })
});

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers(reducersList),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(function* () {
  yield all(sagaList)
});