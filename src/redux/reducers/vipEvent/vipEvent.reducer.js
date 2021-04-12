import constants from "./vipEvent.constants";
import { GlobalReducer, GlobalInitialState } from "reducers/global";

const initialState = {
  ...GlobalInitialState,
  loadingGetNextEventInfo: false
};
export function vipEvent(state = initialState, action) {
  const tryGlobal = GlobalReducer(state, constants, action);
  if (tryGlobal.found) return tryGlobal.state;

  switch (action.type) {
    case constants.GET_NEXT_EVENT_INFO_REQUEST:
      return Object.assign({}, state, {
        loadingGetNextEventInfo: true,
        error: undefined
      });

    case constants.GET_NEXT_EVENT_INFO_SUCCESS:
      if (action.id === state.loadingSegmentsFrom)
        return Object.assign({}, state, {
          loadingGetNextEventInfo: false,
          vipEventInfo: action.payload
        });
      else return state;

    case constants.GET_NEXT_EVENT_INFO_FAILURE:
      if (action.id === state.loadingSegmentsFrom)
        return Object.assign({}, state, {
          loadingGetNextEventInfo: false,
          error: action.error
        });
      else return state;
    default:
      return state;
  }
}

export default vipEvent;
