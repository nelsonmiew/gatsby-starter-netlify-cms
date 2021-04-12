import constants from "./financeTypes.constants";
import theService from "clientServices/financeType";

function getAll() {
  function request() {
    return { type: constants.GET_ALL_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_ALL_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_ALL_FAILURE, error };
  }

  return dispatch => {
    dispatch(request());
    theService.getAll().then(
      resp => {
        if (resp.success) {
          dispatch(success(resp.data));
        }
      },
      error => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function getWireTransferInfo() {
  function request() {
    return { type: constants.GET_WIRE_TRANSFER_INFO_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_WIRE_TRANSFER_INFO_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_WIRE_TRANSFER_INFO_FAILURE, error };
  }

  return dispatch => {
    dispatch(request());
    theService.getWireTransferInfo().then(
      resp => {
        if (resp.success) {
          dispatch(success(resp.data));
        }
      },
      error => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

const financeTypesActions = {
  getAll,
  getWireTransferInfo
};

export default financeTypesActions;
