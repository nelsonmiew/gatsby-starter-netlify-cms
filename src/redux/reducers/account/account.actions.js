import constants from "./account.constants";
import theService from "clientServices/account";
import { FINANCE_MODES } from "src/components/GlobalConstants";

const storagePrefix = "bmcar_";

export const userActions = {
  changePassword,
  clearErrors,
  getMyCompanyDetail,
  getAddresses,
  getFavorites,
  getFavoritesIds,
  getQuotations,
  getOrdersOpen,
  getOrdersCompleted,
  getOrderById,
  uploadOrderDocument,
  downloadOrderDocument,
  addNewAddress,
  updateAddress,
  deleteAddress,
  addFavorite,
  removeFavorite,
  addQuotation,
  updateQuotation,
  removeQuotation,
  getReservations,
  payOrder,
};

function changePassword(oldPasword, newPassword) {
  function request(email) {
    return { type: constants.CHANGEPASSWORD_REQUEST, email };
  }

  function success(email) {
    return { type: constants.CHANGEPASSWORD_SUCCESS, email };
  }

  function failure(error) {
    return { type: constants.CHANGEPASSWORD_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(oldPasword, newPassword));
    theService.changePassword(oldPasword, newPassword).then(
      (resp) => {
        dispatch(success());
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

function getAddresses() {
  function request() {
    return { type: constants.GET_ADDRESSES_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_ADDRESSES_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_ADDRESSES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getAddresses().then(
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

function getMyCompanyDetail() {
  function request() {
    return { type: constants.GET_MY_COMPANY_DETAIL_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_MY_COMPANY_DETAIL_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_MY_COMPANY_DETAIL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getMyCompanyDetail().then(
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

function getReservations() {
  function request() {
    return { type: constants.GET_RESERVATIONS_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_RESERVATIONS_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_RESERVATIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getReservations().then(
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

function getFavorites() {
  function request() {
    return { type: constants.GET_FAVORITES_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_FAVORITES_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_FAVORITES_FAILURE, error };
  }

  return (dispatch, getState) => {
    const { loggedIn } = getState().auth;

    dispatch(request());
    if (loggedIn) {
      theService.getFavorites().then(
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
    } else {
      const favoritesIdsStorage = getFavoriteLocalstorage();
      const favoritesIds =
        favoritesIdsStorage && favoritesIdsStorage.length > 0 ? favoritesIdsStorage.split(",") : null;

      if (favoritesIds) {
        //get vehicles by ids
        theService.getProductsByIds(favoritesIds).then(
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
      } else {
        dispatch(failure());
      }
    }
  };
}

function getFavoritesIds() {
  function request() {
    return { type: constants.GET_FAVORITES_IDS_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_FAVORITES_IDS_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_FAVORITES_IDS_FAILURE, error };
  }

  return (dispatch, getState) => {
    const { loggedIn } = getState().auth;

    dispatch(request());
    if (loggedIn) {
      theService.getFavoritesIds().then(
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
    } else {
      const favoritesIdsStorage = getFavoriteLocalstorage();
      const favoritesIds =
        favoritesIdsStorage && favoritesIdsStorage.length > 0 ? favoritesIdsStorage.split(",") : null;

      if (favoritesIds) {
        dispatch(success(favoritesIds));
      } else {
        dispatch(failure());
      }
    }
  };
}

function getQuotations() {
  function request() {
    return { type: constants.GET_QUOTATIONS_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_QUOTATIONS_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_QUOTATIONS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getQuotations().then(
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

function getOrdersOpen() {
  function request() {
    return { type: constants.GET_ORDERS_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_ORDERS_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_ORDERS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getOrdersOpen().then(
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

function getOrdersCompleted() {
  function request() {
    return { type: constants.GET_ORDERS_COMPLETED_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_ORDERS_COMPLETED_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_ORDERS_COMPLETED_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getOrdersCompleted().then(
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

function uploadOrderDocument(obj, id) {
  function request() {
    return { type: constants.UPDATE_ORDER_DOCUMENT_REQUEST };
  }

  function success(payload) {
    return { type: constants.UPDATE_ORDER_DOCUMENT_SUCCESS, payload };
  }

  function failure(error, payload) {
    return { type: constants.UPDATE_ORDER_DOCUMENT_FAILURE, error, payload };
  }

  return (dispatch) => {
    dispatch(request());
    theService.uploadOrderDocument(obj, id).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(id));
        }
      },
      (error) => dispatch(failure(error, id))
    );
  };
}

function downloadOrderDocument(id) {
  return (dispatch) => {
    //dispatch(request(id));
    theService.downloadOrderDocument(id).then(
      (resp) => {},
      (error) => {}
    );
  };
}

function getOrderById(orderId) {
  function request() {
    return { type: constants.GET_ORDER_BY_ID_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_ORDER_BY_ID_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_ORDER_BY_ID_FAILURE, error };
  }

  return async (dispatch) => {
    dispatch(request());
    await theService.getOrderById(orderId).then(
      (resp) => {
        if (resp.success) {
          if (resp.data.documents) {
            resp.data.documents.forEach(async (doc) => {
              await theService.getOrderDocById(doc.id).then(
                (resp) => {
                  doc.preview = resp;
                },
                (error) => {
                  doc.preview = null;
                }
              );
            });
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

function addNewAddress(userId, address, addressLine2, locality, region, postalCode, isBillingAddress) {
  function request() {
    return { type: constants.ADD_NEW_ADDRESS_REQUEST };
  }

  function success(address) {
    return { type: constants.ADD_NEW_ADDRESS_SUCCESS, address };
  }

  function failure(error) {
    return { type: constants.ADD_NEW_ADDRESS_FAILURE, error };
  }

  let addressObj = {
    address1: address,
    address2: addressLine2,
    locality: locality,
    region: region,
    postalCode: postalCode,
    isBillingAddress: isBillingAddress,
  };

  if (userId) {
    addressObj.customerId = userId;
  }

  return (dispatch) => {
    dispatch(request());
    theService.addNewAddress(addressObj).then(
      (resp) => {
        if (resp.success) {
          console.log("action: success new address");
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

function updateAddress(addressId, address, addressLine2, locality, region, postalCode, isBillingAddress) {
  function request() {
    return { type: constants.UPDATE_ADDRESS_REQUEST };
  }

  function success(address) {
    return { type: constants.UPDATE_ADDRESS_SUCCESS, address };
  }

  function failure(error) {
    return { type: constants.UPDATE_ADDRESS_FAILURE, error };
  }

  const addressObj = {
    address1: address,
    address2: addressLine2,
    locality: locality,
    region: region,
    postalCode: postalCode,
    isBillingAddress: isBillingAddress,
  };

  return (dispatch) => {
    dispatch(request());
    theService.updateAddress(addressObj, addressId).then(
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

function deleteAddress(addressId) {
  function request() {
    return { type: constants.DELETE_ADDRESS_REQUEST };
  }

  function success(payload) {
    return { type: constants.DELETE_ADDRESS_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.DELETE_ADDRESS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.deleteAddress(addressId).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(addressId));
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

function addFavoriteLocalstorage(ids) {
  return localStorage.setItem(storagePrefix + "favorites", ids);
}

function getFavoriteLocalstorage() {
  return localStorage.getItem(storagePrefix + "favorites");
}

function addFavorite(productId) {
  function request() {
    return { type: constants.ADD_FAVORITE_REQUEST };
  }

  function success(payload) {
    return { type: constants.ADD_FAVORITE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.ADD_FAVORITE_FAILURE, error };
  }

  return (dispatch, getState) => {
    const { loggedIn } = getState().auth;

    dispatch(request());
    if (loggedIn) {
      theService.addFavorite({ productId }).then(
        (resp) => {
          if (resp.success) {
            dispatch(success(productId));
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
    } else {
      dispatch(success(productId));
      //add to localstorage
      const { favoritesIds } = getState().account;
      addFavoriteLocalstorage(favoritesIds);
    }
  };
}

function removeFavorite(productId) {
  function request() {
    return { type: constants.DELETE_FAVORITE_REQUEST };
  }

  function success(payload) {
    return { type: constants.DELETE_FAVORITE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.DELETE_FAVORITE_FAILURE, error };
  }

  return (dispatch, getState) => {
    const { loggedIn } = getState().auth;

    dispatch(request());
    if (loggedIn) {
      theService.removeFavorite(productId).then(
        (resp) => {
          if (resp.success) {
            dispatch(success(productId));
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
    } else {
      dispatch(success(productId));
      //update localstorage
      const { favoritesIds } = getState().account;
      addFavoriteLocalstorage(favoritesIds);
    }
  };
}

function addQuotation(
  vehicleId,
  initialDeposit,
  financeMode,
  financeTypeId,
  numberOfMonths,
  annualMileage,
  recoveryValue,
  exchangeVehicleId
) {
  function request() {
    return { type: constants.ADD_QUOTATION_REQUEST };
  }

  function success(payload) {
    return { type: constants.ADD_QUOTATION_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.ADD_QUOTATION_FAILURE, error };
  }

  const quotationObj = {
    vehicleId: vehicleId,
    initialDeposit: initialDeposit,
    financeTypeId: financeTypeId,
    numberMonths: numberOfMonths,
    recoveryValue: recoveryValue,
    exchangeVehicleId: exchangeVehicleId,
  };

  if (financeTypeId === 4) {
    quotationObj.annualMileage = annualMileage;
  }

  return (dispatch) => {
    dispatch(request());
    theService.addQuotation(quotationObj).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(vehicleId));
        }
        dispatch(getQuotations());
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

function updateQuotation(
  quotationId,
  vehicleId,
  initialDeposit,
  financeMode,
  financeTypeId,
  numberOfMonths,
  annualMileage,
  recoveryValue,
  exchangeVehicleId
) {
  function request() {
    return { type: constants.ADD_QUOTATION_REQUEST };
  }

  function success(payload) {
    return { type: constants.ADD_QUOTATION_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.ADD_QUOTATION_FAILURE, error };
  }

  const quotationObj = {
    vehicleId: vehicleId,
    initialDeposit: initialDeposit,
    financeTypeId: financeMode === FINANCE_MODES[0].value ? "" : financeTypeId,
    numberMonths: financeMode === FINANCE_MODES[0].value ? "" : numberOfMonths,
    annualMileage: financeMode === FINANCE_MODES[0].value ? "" : annualMileage,
    recoveryValue: recoveryValue,
    exchangeVehicleId: exchangeVehicleId,
  };

  return (dispatch) => {
    dispatch(request());
    theService.updateQuotation(quotationObj, quotationId).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(vehicleId));
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

function removeQuotation(quotationId) {
  function request() {
    return { type: constants.DELETE_QUOTATION_REQUEST };
  }

  function success(payload) {
    return { type: constants.DELETE_QUOTATION_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.DELETE_QUOTATION_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.removeQuotation(quotationId).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(quotationId));
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

function payOrder(orderId, paymentMethod, mbWayPhoneNumber, isToRedirectToOrderDetail) {
  function request() {
    return { type: constants.PAY_ORDER_REQUEST };
  }

  function success(payload) {
    return { type: constants.PAY_ORDER_SUCCESS, payload };
  }

  function failure(error, payload) {
    return { type: constants.PAY_ORDER_FAILURE, error, payload };
  }

  let payObject = {
    paymentMethod: paymentMethod,
    mbWayPhoneNumber: mbWayPhoneNumber,
    isToRedirectToOrderDetail: isToRedirectToOrderDetail,
  };

  return (dispatch) => {
    dispatch(request());
    theService.payOrder(payObject, orderId).then(
      (resp) => {
        if (resp.success) {
          dispatch(success(resp.data));
        }
      },
      (error) => dispatch(failure(error, orderId))
    );
  };
}

function clearErrors() {
  function request() {
    return { type: constants.CLEAR_ERRORS };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

export default userActions;
