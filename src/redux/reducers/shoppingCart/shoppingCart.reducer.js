import constants from "./shoppingCart.constants";
import { GlobalReducer, GlobalInitialState } from "reducers/global";

const initialState = {
  ...GlobalInitialState,
};

const clearErrors = { message: undefined, error: undefined, couponError: undefined, nonceError: undefined };

export function shoppingCart(state = initialState, action) {
  const tryGlobal = GlobalReducer(state, constants, action);
  if (tryGlobal.found) return tryGlobal.state;

  switch (action.type) {
    //GET CART
    case constants.GET_REQUEST:
      return Object.assign({}, state, {
        loadingShoppingCart: true,
      });

    case constants.GET_SUCCESS:
      return Object.assign({}, state, {
        loadingShoppingCart: false,
        cart: action.payload,
      });

    case constants.UPDATE_FAILURE:
      return Object.assign({}, state, {
        loadingShoppingCart: false,
        error: action.error,
      });

    //GET DEALERS
    case constants.GET_DEALERS_REQUEST:
      return Object.assign({}, state, { loadingDealers: true });

    case constants.GET_DEALERS_SUCCESS:
      return Object.assign({}, state, {
        loadingDealers: false,
        dealers: action.payload,
      });

    case constants.GET_DEALERS_FAILURE:
      return Object.assign({}, state, {
        loadingDealers: false,
        error: action.error,
      });

    //GET PAYMENT TOKEN
    case constants.GET_PAYMENT_TOKEN_REQUEST:
      return Object.assign({}, state, { loadingPaymentToken: true });

    case constants.GET_PAYMENT_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        loadingPaymentToken: false,
        paymentToken: action.payload,
      });

    case constants.GET_PAYMENT_TOKEN_FAILURE:
      return Object.assign({}, state, {
        loadingPaymentToken: false,
        error: action.error,
      });

    //ADD PRODUCT
    case constants.ADD_PRODUCT_REQUEST:
      return Object.assign(
        {},
        state,
        {
          loadingAddProductToCart: true,
          addProductSuccess: false,
          addProductId: action.productId,
          addVariationId: action.variationId,
        },
        clearErrors
      );

    case constants.ADD_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        loadingAddProductToCart: false,
        addProductSuccess: true,
        addProductId: undefined,
        addVariationId: undefined,
      });

    case constants.ADD_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        loadingAddProductToCart: false,
        error: action.error,
      });

    //APPLY COUPON
    case constants.APPLY_COUPON_REQUEST:
      return Object.assign(
        {},
        state,
        {
          loadingApplyCouponToCart: true,
        },
        clearErrors
      );

    case constants.APPLY_COUPON_SUCCESS:
      return Object.assign({}, state, {
        loadingApplyCouponToCart: false,
        cupon: action.payload,
      });

    case constants.APPLY_COUPON_FAILURE:
      return Object.assign({}, state, {
        loadingApplyCouponToCart: false,
        couponError: action.error,
      });

    //CHECKOUT
    case constants.CHECKOUT_REQUEST:
      return Object.assign(
        {},
        state,
        {
          loadingCheckout: true,
          addProductSuccess: false,
        },
        clearErrors
      );

    case constants.CHECKOUT_SUCCESS:
      return Object.assign({}, state, {
        loadingCheckout: false,
        checkout: action.payload,
      });

    case constants.CHECKOUT_FAILURE:
      return Object.assign({}, state, {
        loadingCheckout: false,
        error: action.error,
        errorStatus: action.status,
      });

    //APPLY COUPON
    case constants.NOTIFY_AVAILABLE_REQUEST:
      return Object.assign({}, state, { loadingNotifyWhenAvailable: true });

    case constants.NOTIFY_AVAILABLE_SUCCESS:
      return Object.assign({}, state, {
        loadingNotifyWhenAvailable: false,
      });

    case constants.NOTIFY_AVAILABLE_FAILURE:
      return Object.assign({}, state, {
        loadingNotifyWhenAvailable: false,
        error: action.error,
      });

    //ERRORS
    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);

    case constants.SHOPPING_CART_TOGGLE:
      return Object.assign({}, state, { shoppingCartOpen: !state.shoppingCartOpen });

    default:
      return state;
  }
}

export default shoppingCart;
