import ShoppingCartConstants from "./shoppingCart.constants";
import theService from "clientServices/shoppingCart";

const storagePrefix = "bmcar_";

function setCartId(cartId) {
  //console.log("set cart id");
  return localStorage.setItem(storagePrefix + "cart_id", cartId);
}

function getCartId() {
  return localStorage.getItem(storagePrefix + "cart_id");
}

function getCart() {
  const cartId = getCartId();

  function request() {
    return { type: ShoppingCartConstants.GET_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.GET_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ShoppingCartConstants.GET_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getCart(cartId || "").then(
      (resp) => {
        if (resp.success) {
          if (resp.data && resp.data.id && cartId !== resp.data.id) {
            setCartId(resp.data.id);
          }

          dispatch(success(resp.data));
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function getDealers() {
  function request() {
    return { type: ShoppingCartConstants.GET_DEALERS_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.GET_DEALERS_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ShoppingCartConstants.GET_DEALERS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getDealers().then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function addVehicleToCart(
  id,
  financeTypeId,
  initialDeposit,
  numberOfMonths,
  recoveryValue,
  annualMileage,
  userId,
  isCorporate
) {
  return addToCart(
    id,
    null,
    1,
    financeTypeId,
    initialDeposit,
    numberOfMonths,
    recoveryValue,
    annualMileage,
    userId,
    isCorporate
  );
}

function addProductToCart(id, variationId, quantity, isToAdd, productName, variationName, categoryName, price) {
  return addToCart(
    id,
    variationId,
    quantity,
    null,
    null,
    null,
    null,
    null,
    null,
    false,
    isToAdd,
    productName,
    variationName,
    categoryName,
    price
  );
}

function addToCart(
  id,
  variationId,
  quantity,
  financeTypeId,
  initialDeposit,
  numberOfMonths,
  recoveryValue,
  annualMileage,
  userId,
  isCorporate,
  isToAdd,
  productName,
  variationName,
  categoryName,
  price
) {
  function request(productId, variationId) {
    return { type: ShoppingCartConstants.ADD_PRODUCT_REQUEST, productId, variationId };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.ADD_PRODUCT_SUCCESS, payload };
  }

  function failure(error, status) {
    return { type: ShoppingCartConstants.ADD_PRODUCT_FAILURE, error, status };
  }

  return async (dispatch) => {
    let cartId = getCartId();

    if (!cartId) {
      await theService.getCart().then(
        (resp) => {
          if (resp.success && resp.data && resp.data.id) {
            setCartId(resp.data.id);
            cartId = resp.data.id;
          }
        },
        (error) => {
          if (error.status) {
            dispatch(failure(error.message, error.status));
          } else {
            dispatch(failure(error));
          }
        }
      );
    }

    let cartObj = {
      shoppingCartId: cartId,
      productId: id,
      quantity: parseInt(quantity),
      isCorporate: isCorporate,
    };

    if (variationId) {
      cartObj.variationId = variationId;
    }

    if (financeTypeId) {
      cartObj.financeTypeId = financeTypeId;

      if (financeTypeId === 4) {
        cartObj.annualMileage = annualMileage;
      }
    }

    if (initialDeposit) {
      cartObj.initialDepositSimple = initialDeposit;
    }

    if (numberOfMonths) {
      cartObj.numberMonths = numberOfMonths;
    }

    if (recoveryValue) {
      cartObj.recoveryValue = recoveryValue;
    }

    if (userId) {
      cartObj.customerId = userId;
    }

    if (isToAdd) {
      cartObj.isToAdd = true;
    }

    dispatch(request(id, variationId));
    theService.addProductToCart(cartObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(
            success({
              ...cartObj,
              productName: productName,
              variationName: variationName,
              categoryName: categoryName,
              price: price,
            })
          );
          dispatch(getCart());
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function removeProductFromCart(id, variationId) {
  function request() {
    return { type: ShoppingCartConstants.REMOVE_PRODUCT_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.REMOVE_PRODUCT_SUCCESS, payload };
  }

  function failure(error, status) {
    return { type: ShoppingCartConstants.REMOVE_PRODUCT_FAILURE, error, status };
  }

  return async (dispatch) => {
    let cartId = getCartId();

    if (!cartId) {
      await theService.getCart().then(
        (resp) => {
          if (resp.success && resp.data && resp.data.id) {
            setCartId(resp.data.id);
            cartId = resp.data.id;
          }
        },
        (error) => {
          if (error.status) {
            dispatch(failure(error.message, error.status));
          } else {
            dispatch(failure(error));
          }
        }
      );
    }

    let cartObj = {
      shoppingCartId: cartId,
      productId: id,
    };

    if (variationId) {
      cartObj.variationId = variationId;
    }

    dispatch(request());
    theService.removeProductFromCart(cartObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(cartObj));
          dispatch(getCart());
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function acceptRejectPendentProduct(id, variationId, isToAccept) {
  function request() {
    return { type: ShoppingCartConstants.PENDENT_PRODUCT_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.PENDENT_PRODUCT_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ShoppingCartConstants.PENDENT_PRODUCT_FAILURE, error };
  }

  let cartObj = {
    productId: id,
    isToAccept: isToAccept,
  };

  if (variationId) {
    cartObj.variationId = variationId;
  }

  return (dispatch) => {
    dispatch(request());
    theService.acceptRejectPendentProduct(cartObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
          dispatch(getCart());
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function applyCoupon(code) {
  function request() {
    return { type: ShoppingCartConstants.APPLY_COUPON_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.APPLY_COUPON_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ShoppingCartConstants.APPLY_COUPON_FAILURE, error };
  }

  return async (dispatch) => {
    let cartId = getCartId();

    if (!cartId) {
      await theService.getCart().then(
        (resp) => {
          if (resp.success && resp.data && resp.data.id) {
            setCartId(resp.data.id);
            cartId = resp.data.id;
          }
        },
        (error) => {
          if (error.status) {
            dispatch(failure(error.message, error.status));
          } else {
            dispatch(failure(error));
          }
        }
      );
    }

    dispatch(request());
    theService.applyCoupon({ shoppingCartId: cartId, couponCode: code }).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
          dispatch(getCart());
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function removeCoupon(id) {
  function request() {
    return { type: ShoppingCartConstants.REMOVE_COUPON_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.REMOVE_COUPON_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ShoppingCartConstants.REMOVE_COUPON_FAILURE, error };
  }

  return async (dispatch) => {
    let cartId = getCartId();

    if (!cartId) {
      await theService.getCart().then(
        (resp) => {
          if (resp.success && resp.data && resp.data.id) {
            setCartId(resp.data.id);
            cartId = resp.data.id;
          }
        },
        (error) => {
          if (error.status) {
            dispatch(failure(error.message, error.status));
          } else {
            dispatch(failure(error));
          }
        }
      );
    }

    dispatch(request());
    theService.removeCoupon(id, cartId).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
          dispatch(getCart());
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function checkout(
  deliveringAddressId,
  billingAddressId,
  isToDeliveringInDealer,
  paymentMethod,
  mbWayPhoneNumber,
  vatNumber,
  userId,
  exchangeVehicleId,
  checkoutProducts
) {
  const cartId = getCartId();

  function request() {
    return { type: ShoppingCartConstants.CHECKOUT_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.CHECKOUT_SUCCESS, payload };
  }

  function failure(error, status) {
    return { type: ShoppingCartConstants.CHECKOUT_FAILURE, error, status };
  }

  let checkoutObj = {
    checkoutTypeId: checkoutProducts ? 2 : 1,
    shoppingCartId: cartId || "",
    deliveringAddressId: deliveringAddressId,
    billingAddressId: billingAddressId,
    isToDeliveringInDealer: isToDeliveringInDealer,
    paymentMethod: paymentMethod,
    mbWayPhoneNumber: mbWayPhoneNumber,
    vatNumber: vatNumber,
  };

  if (userId) {
    checkoutObj.customerId = userId;
  }

  if (exchangeVehicleId) {
    checkoutObj.exchangeVehicleId = exchangeVehicleId;
  }

  return (dispatch) => {
    dispatch(request());
    theService.checkout(checkoutObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(success({ ...resp.data, checkoutTypeId: checkoutObj.checkoutTypeId }));
          dispatch(getCart());
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function reservation(
  vehicleId,
  financeTypeId,
  initialDeposit,
  numberOfMonths,
  annualMileage,
  recoveryValue,
  exchangeVehicleId,
  userId
) {
  function request() {
    return { type: ShoppingCartConstants.CHECKOUT_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.CHECKOUT_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ShoppingCartConstants.CHECKOUT_FAILURE, error };
  }

  let reservationObj = {
    vehicleId: vehicleId,
    financeTypeId: financeTypeId,
    initialDeposit: initialDeposit,
    numberMonths: numberOfMonths,
    recoveryValue: recoveryValue,
    exchangeVehicleId: exchangeVehicleId || "",
  };

  if (financeTypeId === 4) {
    reservationObj.annualMileage = annualMileage;
  }

  if (userId) {
    reservationObj.customerId = userId;
  }

  return (dispatch) => {
    dispatch(request());
    theService.reservation(reservationObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function preCheckout() {
  return () => {
    theService.preCheckout();
  };
}

function clearErrors() {
  function request() {
    return { type: ShoppingCartConstants.CLEAR_ERRORS };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

function toggleShoppingCart() {
  function request() {
    return { type: ShoppingCartConstants.SHOPPING_CART_TOGGLE };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

function triggerCheckoutPage() {
  function request() {
    return { type: ShoppingCartConstants.CHECKOUT_PAGE };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

function nofityWhenAvailable(productId, variationId, email, phoneNumber) {
  function request() {
    return { type: ShoppingCartConstants.NOTIFY_AVAILABLE_REQUEST };
  }

  function success(payload) {
    return { type: ShoppingCartConstants.NOTIFY_AVAILABLE_SUCCESS, payload };
  }

  function failure(error, status) {
    return { type: ShoppingCartConstants.NOTIFY_AVAILABLE_FAILURE, error, status };
  }

  let notifyObj = {
    productId,
    email: email || "",
    phoneNumber: phoneNumber || "",
    consentMarketingPolicy: true,
  };

  if (variationId) {
    notifyObj.variationId = variationId;
  }

  return (dispatch) => {
    dispatch(request());
    theService.nofityWhenAvailable(notifyObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
        }
      },
      (error) => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

const shoppingCartActions = {
  getCart,
  getDealers,
  addVehicleToCart,
  addProductToCart,
  removeProductFromCart,
  acceptRejectPendentProduct,
  applyCoupon,
  removeCoupon,
  checkout,
  preCheckout,
  reservation,
  clearErrors,
  toggleShoppingCart,
  triggerCheckoutPage,
  nofityWhenAvailable,
};

export default shoppingCartActions;
