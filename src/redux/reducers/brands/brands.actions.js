import constants from "./brands.constants";
import theService from "clientServices/brand";

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

function getSegmentsByBrandId(id) {
  function request(id) {
    return { type: constants.GET_SEGMENTS_REQUEST, id };
  }
  function success(payload) {
    return { type: constants.GET_SEGMENTS_SUCCESS, payload, id };
  }
  function failure(error) {
    return { type: constants.GET_SEGMENTS_FAILURE, error, id };
  }

  return dispatch => {
    dispatch(request(id));
    theService.getSegmentsByBrandId(id).then(
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

function getAllSegments() {
  function request() {
    return { type: constants.GET_SEGMENTS_REQUEST };
  }
  function success(payload) {
    return { type: constants.GET_SEGMENTS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.GET_SEGMENTS_FAILURE, error };
  }

  return dispatch => {
    dispatch(request());
    theService.getAllSegments().then(
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

function clearErrors() {
  function request() {
    return { type: constants.CLEAR_ERRORS };
  }
  return dispatch => {
    dispatch(request());
  };
}

const brandActions = {
  getAll,
  getSegmentsByBrandId,
  getAllSegments,
  clearErrors
};

export default brandActions;
