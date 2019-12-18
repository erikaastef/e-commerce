import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";

import reducers from "./reducers";


const middleware = [
  thunkMiddleware,
  promiseMiddleware(),
  createLogger()
];

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
