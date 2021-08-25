import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { appReducer } from "./app/reducer";
import { fetchReducer } from "./fetch/reducer";
import { authReducer } from "./auth/reducer";
import { composeWithDevTools } from "redux-devtools-extension";




const allEnhancers = composeWithDevTools(applyMiddleware(thunk));

export interface Store {
  app: ReturnType<typeof appReducer>;
  fetch: ReturnType<typeof fetchReducer>;
  auth: ReturnType<typeof authReducer>;
}

export type store = Store;
//eslint-disable-next-line
export const store = createStore(
  combineReducers({
    app: appReducer,
    fetch: fetchReducer,
    auth: authReducer
  }),
  allEnhancers
);
