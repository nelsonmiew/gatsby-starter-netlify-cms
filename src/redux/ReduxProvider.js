import React from "react";
import { Provider } from "react-redux";
// import { createStore as reduxCreateStore } from "redux";
import { store } from "./configStore";

export default ({ children }) => <Provider store={store}>{{children}}</Provider>;
