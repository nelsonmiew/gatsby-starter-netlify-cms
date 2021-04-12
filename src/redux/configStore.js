import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
  import rootReducer from "./reducers";
//  import AppActions from "reducers/app/app.actions";
//import baseMiddleware from "./middlewares/baseMiddleware";

const { NODE_ENV } = process.env;
const initialState = {};
const middlewares = [thunk];
const windowGlobal = typeof window !== "undefined" && window;
const theWindow = (typeof window !== "undefined" && window) || {};

const isDev =
  NODE_ENV === "development" &&
  windowGlobal.devToolsExtension &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = isDev
  ? createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middlewares), theWindow.__REDUX_DEVTOOLS_EXTENSION__())
    )
  : createStore(rootReducer, compose(applyMiddleware(...middlewares)));

export { store };
