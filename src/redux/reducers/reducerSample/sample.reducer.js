import constants from "./sample.constants";
import { GlobalReducer, GlobalInitialState } from "reducers/global";

const initialState = {
  ...GlobalInitialState
};

export function sample(state = initialState, action) {
  const tryGlobal = GlobalReducer(state, constants, action);
  if (tryGlobal.found) return tryGlobal.state;

  switch (action.type) {
    case "CUSTOM ACTION TYPE":
      //custom state change
      return {
        customNumber: Math.random(),
        ...state
      };

    default:
      return state;
  }
}

export default sample;
