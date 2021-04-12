import constants from "./exchangeVehicle.constants";
import { GlobalReducer, GlobalInitialState } from "reducers/global";

const initialState = {
  ...GlobalInitialState
};

const clearErrors = { error: undefined };

export function exchangeVehicle(state = initialState, action) {
  const tryGlobal = GlobalReducer(state, constants, action);

  if (tryGlobal.found) return tryGlobal.state;
  switch (action.type) {
    
    case constants.GET_BRANDS_REQUEST:
      return Object.assign({}, state, { loadingGetBrands: true });
    case constants.GET_BRANDS_SUCCESS:
      return Object.assign({}, state, { loadingGetBrands: false, brands: action.payload });
    case constants.GET_BRANDS_FAILURE:
      return Object.assign({}, state, { loadingGetBrands: false, error: action.error });

    case constants.GET_FUELS_REQUEST:
      return Object.assign({}, state, { loadingGetFuels: true });
    case constants.GET_FUELS_SUCCESS:
      return Object.assign({}, state, { loadingGetFuels: false, fuels: action.payload });
    case constants.GET_FUELS_FAILURE:
      return Object.assign({}, state, { loadingGetFuels: false, error: action.error });

    case constants.GET_MODELS_REQUEST:
      return Object.assign({}, state, { loadingGetModels: true });
    case constants.GET_MODELS_SUCCESS:
      return Object.assign({}, state, { loadingGetModels: false, models: action.payload });
    case constants.GET_MODELS_FAILURE:
      return Object.assign({}, state, { loadingGetModels: false, error: action.error });

    case constants.GET_VERSIONS_REQUEST:
      return Object.assign({}, state, { loadingGetVersions: true });
    case constants.GET_VERSIONS_SUCCESS:
      return Object.assign({}, state, { loadingGetVersions: false, versions: action.payload });
    case constants.GET_VERSIONS_FAILURE:
      return Object.assign({}, state, { loadingGetVersions: false, error: action.error });
    
    case constants.CLEAR:
      return Object.assign({}, state, { item: undefined });

    //ERRORS
    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);

    default:
      return state;
  }
}

export default exchangeVehicle;
