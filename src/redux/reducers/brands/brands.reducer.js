import constants from "./brands.constants";
import { GlobalReducer, GlobalInitialState } from "reducers/global";

const initialState = {
  ...GlobalInitialState,
  loadingSegments: false,
  loadingSegmentsFrom: ''
};
const clearErrors = { message: undefined, error: undefined };

export function customer(state = initialState, action) {
  const tryGlobal = GlobalReducer(state, constants, action);
  if (tryGlobal.found) return tryGlobal.state;

  switch (action.type) {
    case constants.GET_SEGMENTS_REQUEST:
      return Object.assign({}, state, {
        loadingSegments: true,
        loadingSegmentsFrom: action.id
      });

    case constants.GET_SEGMENTS_SUCCESS:
      if (action.id === state.loadingSegmentsFrom)
        return Object.assign({}, state, {
          loadingSegments: false,
          segments: action.payload
        });
      else return state;

    case constants.GET_SEGMENTS_FAILURE:
      if (action.id === state.loadingSegmentsFrom)
        return Object.assign({}, state, {
          loadingSegments: false,
          error: action.error
        });
      else return state;
    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);
    default:
      return state;
  }
}

export default customer;
