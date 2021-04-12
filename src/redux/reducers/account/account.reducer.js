import constants from "./account.constants";
//import { GlobalInitialState} from 'reducers/global'

const initialState = {
  loadingChangePassword: false,
};

const clearErrors = { message: undefined, error: undefined };

export function sample(state = initialState, action) {
  switch (action.type) {
    //reset password
    case constants.CHANGEPASSWORD_REQUEST:
      return Object.assign({}, state, { loadingChangePassword: true, user: action.user }, clearErrors);

    case constants.CHANGEPASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loadingChangePassword: false,
        passwordResetOk: true,
        message: action.message,
      });

    case constants.CHANGEPASSWORD_FAILURE:
      return Object.assign({}, state, {
        loadingChangePassword: false,
        passwordResetOk: false,
        error: action.error,
      });

    //get my companies
    case constants.GET_MY_COMPANY_DETAIL_REQUEST:
      return Object.assign({}, state, { loadingGetMyCompany: true }, clearErrors);

    case constants.GET_MY_COMPANY_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        loadingGetMyCompany: false,
        myCompany: action.payload,
      });

    case constants.GET_MY_COMPANY_DETAIL_FAILURE:
      return Object.assign({}, state, {
        loadingGetMyCompany: false,
        error: action.error,
      });

    //get favorites
    case constants.GET_FAVORITES_REQUEST:
      return Object.assign({}, state, { loadingFavorites: true }, clearErrors);

    case constants.GET_FAVORITES_SUCCESS:
      return Object.assign({}, state, {
        loadingFavorites: false,
        favorites: action.payload,
        favoritesIds: action.payload.map((f) =>
          f.simpleProduct ? f.simpleProduct.id : f.vehicle ? f.vehicle.id : false
        ),
      });

    case constants.GET_FAVORITES_FAILURE:
      return Object.assign({}, state, {
        loadingFavorites: false,
        error: action.error,
      });

    //get favorites ids
    case constants.GET_FAVORITES_IDS_REQUEST:
      return Object.assign({}, state, { loadingFavorites: true }, clearErrors);

    case constants.GET_FAVORITES_IDS_SUCCESS:
      return Object.assign({}, state, {
        loadingFavorites: false,
        favoritesIds: action.payload,
      });

    case constants.GET_FAVORITES_IDS_FAILURE:
      return Object.assign({}, state, {
        loadingFavorites: false,
        error: action.error,
      });

    //add favorites
    case constants.ADD_FAVORITE_REQUEST:
      return Object.assign({}, state, { loadingFavorites: true }, clearErrors);

    case constants.ADD_FAVORITE_SUCCESS:
      return Object.assign({}, state, {
        loadingFavorites: false,
        favoritesIds: state.favoritesIds ? [...state.favoritesIds, action.payload] : [action.payload],
      });

    case constants.ADD_FAVORITE_FAILURE:
      return Object.assign({}, state, {
        loadingFavorites: false,
        error: action.error,
      });

    //remove favorites
    case constants.DELETE_FAVORITE_REQUEST:
      return Object.assign({}, state, { loadingFavorites: true }, clearErrors);

    case constants.DELETE_FAVORITE_SUCCESS:
      return Object.assign({}, state, {
        loadingFavorites: false,
        favoritesIds: state.favoritesIds ? state.favoritesIds.filter((item) => item !== action.payload) : [],
        favorites: state.favorites
          ? state.favorites.filter((f) =>
              f.simpleProduct
                ? f.simpleProduct.id !== action.payload
                : f.vehicle
                ? f.vehicle.id !== action.payload
                : false
            )
          : [],
      });

    case constants.DELETE_FAVORITE_FAILURE:
      return Object.assign({}, state, {
        loadingFavorites: false,
      });

    //get reservations
    case constants.GET_RESERVATIONS_REQUEST:
      return Object.assign({}, state, { loadingReservations: true }, clearErrors);

    case constants.GET_RESERVATIONS_SUCCESS:
      return Object.assign({}, state, {
        loadingReservations: false,
        reservations: action.payload,
        reservationsIds: action.payload.map((f) =>
          f.simpleProduct ? f.simpleProduct.id : f.vehicle ? f.vehicle.id : false
        ),
      });

    case constants.GET_RESERVATIONS_FAILURE:
      return Object.assign({}, state, {
        loadingReservations: false,
        error: action.error,
      });

    //get quotations
    case constants.GET_QUOTATIONS_REQUEST:
      return Object.assign({}, state, { loadingQuotations: true }, clearErrors);

    case constants.GET_QUOTATIONS_SUCCESS:
      return Object.assign({}, state, {
        loadingQuotations: false,
        quotations: action.payload,
        quotationsProductsIds: action.payload.map((q) => q.id),
        //favoritesIds: action.payload.map(f => f.product.id)
      });

    case constants.GET_QUOTATIONS_FAILURE:
      return Object.assign({}, state, {
        loadingQuotations: false,
        error: action.error,
      });

    //add quotations
    case constants.ADD_QUOTATION_REQUEST:
      return Object.assign({}, state, { loadingQuotations: true }, clearErrors);

    case constants.ADD_QUOTATION_SUCCESS:
      return Object.assign({}, state, {
        loadingQuotations: false,
        quotationsProductsIds: state.quotationsProductsIds
          ? [...state.quotationsProductsIds, action.payload]
          : [action.payload],
        //quotations: state.quotations ? [...state.quotations, action.payload] : [action.payload]
      });

    case constants.ADD_QUOTATION_FAILURE:
      return Object.assign({}, state, {
        loadingQuotations: false,
        error: action.error,
      });

    //update quotations
    case constants.UPDATE_QUOTATION_REQUEST:
      return Object.assign({}, state, { loadingQuotations: true }, clearErrors);

    case constants.UPDATE_QUOTATION_SUCCESS:
      return Object.assign({}, state, {
        loadingQuotations: false,
        //favoritesIds: state.favoritesIds ? [...state.favoritesIds, action.payload] : [action.payload]
      });

    case constants.UPDATE_QUOTATION_FAILURE:
      return Object.assign({}, state, {
        loadingQuotations: false,
        error: action.error,
      });

    //remove quotations
    case constants.DELETE_QUOTATION_REQUEST:
      return Object.assign({}, state, { loadingQuotations: true }, clearErrors);

    case constants.DELETE_QUOTATION_SUCCESS:
      return Object.assign({}, state, {
        loadingQuotations: false,
        quotationsProductsIds: state.quotationsProductsIds.filter((item) => item !== action.payload),
        quotations: state.quotations.filter((item) => item.id !== action.payload),
      });

    case constants.DELETE_QUOTATION_FAILURE:
      return Object.assign({}, state, {
        loadingQuotations: false,
      });

    //upload order document
    case constants.UPDATE_ORDER_DOCUMENT_REQUEST:
      return Object.assign({}, state, { loadingUploadOrderDocument: true, docSubmitedId: undefined });

    case constants.UPDATE_ORDER_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        loadingUploadOrderDocument: false,
        docSubmitedId: action.payload,
        order: {
          ...state.order,
          documents: state.order.documents.map((item) => {
            if (item.id !== action.payload) {
              return item;
            }

            return {
              ...item,
              isSubmited: true,
              isAnswered: false,
              rejectedReason: "",
              submitedDate: new Date().toLocaleDateString(),
            };
          }),
        },
      });

    case constants.UPDATE_ORDER_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        loadingUploadOrderDocument: false,
        docSubmitedId: action.payload,
        error: action.error,
      });

    //get orders
    case constants.GET_ORDERS_REQUEST:
      return Object.assign({}, state, { loadingAccountOrders: true });

    case constants.GET_ORDERS_SUCCESS:
      return Object.assign({}, state, {
        loadingAccountOrders: false,
        orders: action.payload,
      });

    case constants.GET_ORDERS_FAILURE:
      return Object.assign({}, state, {
        loadingAccountOrders: false,
        error: action.error,
      });

    //get orders completed
    case constants.GET_ORDERS_COMPLETED_REQUEST:
      return Object.assign({}, state, { loadingAccountOrdersCompleted: true });

    case constants.GET_ORDERS_COMPLETED_SUCCESS:
      return Object.assign({}, state, {
        loadingAccountOrdersCompleted: false,
        ordersCompleted: action.payload,
      });

    case constants.GET_ORDERS_COMPLETED_FAILURE:
      return Object.assign({}, state, {
        loadingAccountOrdersCompleted: false,
        error: action.error,
      });

    //get order by id
    case constants.GET_ORDER_BY_ID_REQUEST:
      return Object.assign({}, state, { loadingAccountOrderById: true, order: undefined, payOrder: undefined });

    case constants.GET_ORDER_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        loadingAccountOrderById: false,
        order: action.payload,
      });

    case constants.GET_ORDER_BY_ID_FAILURE:
      return Object.assign({}, state, {
        loadingAccountOrderById: false,
        error: action.error,
      });

    //get addresses
    case constants.GET_ADDRESSES_REQUEST:
      return Object.assign({}, state, { loadingAccountAddresses: true }, clearErrors);

    case constants.GET_ADDRESSES_SUCCESS:
      return Object.assign({}, state, {
        loadingAccountAddresses: false,
        addresses: action.payload,
      });

    case constants.GET_ADDRESSES_FAILURE:
      return Object.assign({}, state, {
        loadingAccountAddresses: false,
        error: action.error,
      });

    //add new address
    case constants.ADD_NEW_ADDRESS_REQUEST:
      return Object.assign({}, state, { loadingAddNewAddress: true, newAddressId: undefined }, clearErrors);

    case constants.ADD_NEW_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        loadingAddNewAddress: false,
        newAddressId: action.address.addressId,
        addresses: state.addresses ? [...state.addresses, action.address] : [action.address],
      });

    case constants.ADD_NEW_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        loadingAddNewAddress: false,
        newAddressId: undefined,
        error: action.error,
      });

    //update address
    case constants.UPDATE_ADDRESS_REQUEST:
      return Object.assign({}, state, { loadingUpdateAddress: true }, clearErrors);

    case constants.UPDATE_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        loadingUpdateAddress: false,
        addresses: state.addresses.map((item) => {
          if (item.addressId !== action.address.addressId) {
            return item;
          }

          return {
            ...item,
            ...action.address,
          };
        }),
      });

    case constants.UPDATE_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        loadingUpdateAddress: false,
        newAddress: undefined,
        error: action.error,
      });

    //delete address
    case constants.DELETE_ADDRESS_REQUEST:
      return Object.assign({}, state, { loadingDeleteAddress: true }, clearErrors);

    case constants.DELETE_ADDRESS_SUCCESS:
      const addressIndex = state.addresses ? state.addresses.findIndex((a) => a.addressId === action.payload) : -1;

      return Object.assign({}, state, {
        loadingDeleteAddress: false,
        addresses:
          addressIndex >= 0
            ? [...state.addresses.slice(0, addressIndex), ...state.addresses.slice(addressIndex + 1)]
            : state.addresses,
      });

    case constants.DELETE_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        loadingDeleteAddress: false,
        error: action.error,
      });

    //PAY ORDER
    case constants.PAY_ORDER_REQUEST:
      return Object.assign({}, state, { loadingPayOrder: true });

    case constants.PAY_ORDER_SUCCESS:
      return Object.assign({}, state, {
        loadingPayOrder: false,
        payOrder: action.payload,
      });

    case constants.PAY_ORDER_FAILURE:
      return Object.assign({}, state, {
        loadingPayOrder: false,
        error: action.error,
      });

    //CLEAR ERRORS
    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);

    default:
      return state;
  }
}

export default sample;
