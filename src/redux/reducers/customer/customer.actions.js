import constants from "./customer.constants";
import authConstants from "../authentication/auth.constants";
import theService from "clientServices/customer";
import authService from "services/general/auth.service";


function getMyInfo() {
  function request() { return { type: constants.GET_MYINFO_REQUEST } }
  function success(payload) { return { type: constants.GET_MYINFO_SUCCESS, payload }; }
  function failure(error) { return { type: constants.GET_MYINFO_FAILURE, error }; }

  return dispatch => {
    dispatch(request());
    theService.getMyInfo().then(
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

function setMyInfo(obj) {
  function request() { return { type: constants.SET_MYINFO_REQUEST } }
  function success(payload) { return { type: constants.SET_MYINFO_SUCCESS, payload }; }
  function successToken(user) { return { type: authConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: constants.SET_MYINFO_FAILURE, error }; }

  return dispatch => {
    dispatch(request());
    theService.setMyInfo(obj).then(
      resp => {
        authService.setToken(resp.token);
        dispatch(success());
        console.log(authService.getProfile())
        dispatch(successToken(authService.getProfile()));
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
  getMyInfo,
  setMyInfo,


  clearErrors
};

export default brandActions;
