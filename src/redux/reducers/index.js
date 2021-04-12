import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

const appReducer = combineReducers({
  form 
});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT") {
    //console.log('CLEAR STATE!');
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
