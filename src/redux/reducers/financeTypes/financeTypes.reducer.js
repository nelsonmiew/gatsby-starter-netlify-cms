import constants from "./financeTypes.constants";

const initialState = {
  loadingGetFinanceTypes: false
};

export function financeType(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ALL_REQUEST:
      return Object.assign({}, state, { loadingGetFinanceTypes: true });

    case constants.GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        loadingGetFinanceTypes: false,
        item: action.payload,
        constants:
          (action.payload &&
            action.payload.financeTypes &&
            action.payload.financeTypes
              .filter(o => o.id > 1)
              .map(o => {
                return { value: o.id, label: o.name, 
                  //disabled: o.id !== 4 
                };
              })) ||
          []
      });

    case constants.GET_ALL_FAILURE:
      return Object.assign({}, state, {
        loadingGetFinanceTypes: false,
        error: action.error
      });

    case constants.GET_WIRE_TRANSFER_INFO_REQUEST:
      return Object.assign({}, state, {
        loadingWireTransferInfo: true
      });

    case constants.GET_WIRE_TRANSFER_INFO_SUCCESS:
      return Object.assign({}, state, {
        loadingWireTransferInfo: false,
        wireTransferInfo: action.payload
      });
    case constants.GET_WIRE_TRANSFER_INFO_FAILURE:
      return Object.assign({}, state, {
        loadingWireTransferInfo: false,
        errorPost: action.error
      });
    default:
      return state;
  }
}

export default financeType;
