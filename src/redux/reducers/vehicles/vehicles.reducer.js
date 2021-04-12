import constants from "./vehicles.constants";
import { GlobalReducer, GlobalInitialState } from "reducers/global";
const initialState = {
  ...GlobalInitialState,
};
const clearErrors = { message: undefined, error: undefined };

export function vehiclesReducer(state = initialState, action) {
  const tryGlobal = GlobalReducer(state, constants, action);

  if (tryGlobal.found) return tryGlobal.state;
  switch (action.type) {
    case "CUSTOM ACTION TYPE":
      //custom state change
      return {
        customNumber: Math.random(),
        ...state,
      };
    case constants.GET_FILTERED_REQUEST:
      return Object.assign({}, state, {
        loadingByFilter: true,
        filterData: { type: action.filterType, max: action.max, min: action.min },
      });
    case constants.GET_FILTERED_SUCCESS:
      if (action.id === state.loadingSegmentsFrom)
        return Object.assign({}, state, {
          loadingByFilter: false,
          models: action.payload,
          priceAverage: action.payload.vehiclesQuantityInfo.priceAverage,
          colors: action.payload.colors,
          transmissions: action.payload.transmissions,
          discounts: action.payload.discounts,
          status: action.payload.status,
          engines: action.payload.engines,
          kmMax: action.payload.kmMax,
          vehiclesQuantities: action.payload.vehiclesQuantityInfo.quantities
            ? action.payload.vehiclesQuantityInfo.quantities.map((q, i) => {
                return {
                  v: action.payload.vehiclesQuantityInfo.priceInitial + action.payload.vehiclesQuantityInfo.step * i,
                  t: q,
                };
              })
            : [],
        });
      else return state;
    case constants.GET_SEGMENTS_FAILURE:
      if (action.id === state.loadingSegmentsFrom)
        return Object.assign({}, state, { loadingByFilter: false, error: action.error });
      else return state;
    case constants.GET_VEHICLES_QUANTITIES_REQUEST:
      return Object.assign({}, state, { loadingGetVehiclesQuantities: true });
    case constants.GET_VEHICLES_QUANTITIES_SUCCESS:
      return Object.assign({}, state, {
        vehiclesQuantities: action.payload.map((vq) => {
          return { v: vq.price, t: vq.numberVehicles };
        }),
        loadingGetVehiclesQuantities: false,
      });
    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);
    case constants.GET_NEXT_BY_ID_REQUEST:
      return Object.assign({}, state, { loadingGetNextById: true });
    case constants.GET_NEXT_BY_ID_SUCCESS:
      return Object.assign({}, state, { loadingGetNextById: false, nextById: action.payload });
    case constants.GET_BY_ID_SIMPLE_REQUEST:
      return Object.assign({}, state, { loadingSimpleById: true }, clearErrors);
    case constants.GET_BY_ID_SIMPLE_SUCCESS:
      return Object.assign({}, state, { loadingSimpleById: false, simple: action.payload });
    case constants.GET_BY_ID_SIMPLE_FAILURE:
      return Object.assign({}, state, { loadingSimpleById: false, error: action.error });
    case constants.GET_FEATURES_BY_ID_REQUEST:
      return Object.assign({}, state, { loadingGetFeaturesById: true });
    case constants.GET_FEATURES_BY_ID_SUCCESS:
      return Object.assign({}, state, { loadingGetFeaturesById: false, vehicleFeatures: action.payload });
    case constants.SET_STATIC_DATA:
      return Object.assign({}, state, {
        data: action.payload,
      });
    // case constants.GET_ENGINE_TYPES_REQUEST:
    //   return Object.assign({}, state, { loadingGetEngineTypes: true });
    // case constants.GET_ENGINE_TYPES_SUCCESS:
    //   return Object.assign({}, state, {
    //     loadingGetEngineTypes: false,
    //     engineTypes: action.payload,
    //   });
    // case constants.GET_ENGINE_TYPES_FAILURE:
    //   return Object.assign({}, state, {
    //     loadingGetEngineTypes: false,
    //     error: action.error,
    //   });
    // case constants.GET_COLOR_TYPES_REQUEST:
    //   return Object.assign({}, state, { loadingGetColorTypes: true });
    // case constants.GET_COLOR_TYPES_SUCCESS:
    //   return Object.assign({}, state, {
    //     loadingGetColorTypes: false,
    //     colorTypes: action.payload,
    //   });
    // case constants.GET_COLOR_TYPES_FAILURE:
    //   return Object.assign({}, state, {
    //     loadingGetColorTypes: false,
    //     error: action.error,
    //   });
    default:
      return state;
  }
}

export default vehiclesReducer;
