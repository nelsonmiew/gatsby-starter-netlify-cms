import constants from "./customer.constants";
import { GlobalInitialState } from "reducers/global";

const initialState = {
  ...GlobalInitialState,
  loadingMyInfo: false
};
const clearErrors = { message: undefined, error: undefined };

export function customer(state = initialState, action) {
  //não é necessario ver o global
  //const tryGlobal = GlobalReducer(state, constants, action);
  //if (tryGlobal.found) return tryGlobal.state;

  switch (action.type) {
    case constants.GET_MYINFO_REQUEST:
      return Object.assign({}, state, {
        loadingMyInfo: true
      });

    case constants.GET_MYINFO_SUCCESS:
      return Object.assign({}, state, {
        loadingMyInfo: false,
        myInfo: action.payload
      });
    case constants.GET_MYINFO_FAILURE:
      return Object.assign({}, state, {
        loadingMyInfo: false,
        errorPost: action.error
      });

    case constants.SET_MYINFO_REQUEST:
      return Object.assign({}, state, {
        loadingSetMyInfo: true
      });

    case constants.SET_MYINFO_SUCCESS:
      return Object.assign({}, state, {
        loadingSetMyInfo: false
      });
    case constants.SET_MYINFO_FAILURE:
      return Object.assign({}, state, {
        loadingSetMyInfo: false,
        errorPost: action.error
      });

    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);
    default:
      return state;
  }
}

export default customer;
