import constants from "./auth.constants";
import theService from "services/general/auth.service";
import appActions from "../app/app.actions";

function checkSavedLogin() {
  function success(user, roles) {
    return { type: constants.LOGIN_SUCCESS, user };
  }

  function noLogin(user, roles) {
    return { type: constants.LOGIN_FAILURE };
  }

  const prof = theService.getProfile();

  if (prof && prof.email) {
    return (dispatch) => {
      dispatch(success(prof));
    };
  } else {
    return (dispatch) => {
      dispatch(noLogin());
    };
  }
}

function login(username, password, automationId) {
  function request(user) {
    return { type: constants.LOGIN_REQUEST, user };
  }

  function success(user, roles) {
    return { type: constants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: constants.LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request({ username }));
    theService.login(username, password, automationId).then(
      (resp) => {
        if (resp.roles.includes("Customer")) {
          dispatch(success(resp.profile));
          dispatch(appActions.initializeApp());
        } else {
          theService.logout(true);
          dispatch(failure("Esta conta não pode ser utilizada."));
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

function logout() {
  theService.logout();
  return { type: constants.LOGOUT };
}

function accountExist(email) {
  function request() {
    return { type: constants.ACCOUNT_EXIST_REQUEST };
  }

  function success(email) {
    return { type: constants.ACCOUNT_EXIST_SUCCESS, email };
  }

  function failure(error) {
    return { type: constants.ACCOUNT_EXIST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(email));
    theService.accountExist({ email: email }).then(
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

function forgotPassword(email) {
  function request(email) {
    return { type: constants.FORGOTPASSWORD_REQUEST, email };
  }

  function success(email, roles) {
    return { type: constants.FORGOTPASSWORD_SUCCESS, email };
  }

  function failure(error) {
    return { type: constants.FORGOTPASSWORD_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(email));
    theService.forgotPassword(email).then(
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

function clearErrors() {
  function request() {
    return { type: constants.CLEAR_ERRORS };
  }

  return (dispatch) => {
    dispatch(request());
  };
}

function createAccount(
  email,
  firstName,
  lastName,
  phoneNumber,
  consentPrivacyPolicy,
  consentUseDataPolicy,
  consentMarketingPolicy,
  expressActivation,
  appointmentContact,
  appointmentDate,
  appointmentPeriod,
  appointmentIsEvent,
  appointmentVehicleId
) {
  function request(payload) {
    return { type: constants.CREATE_CLIENT_REQUEST, payload };
  }

  function success(user) {
    return { type: constants.CREATE_CLIENT_SUCCESS, user };
  }

  function failure(error) {
    return { type: constants.CREATE_CLIENT_FAILURE, error };
  }

  let obj = {
    email,
    firstName,
    lastName,
    phoneNumber,
    consentPrivacyPolicy,
    consentUseDataPolicy,
    consentMarketingPolicy,
    appointmentContact,
    appointmentDate,
    appointmentPeriod,
    appointmentIsEvent,
  };

  if (appointmentVehicleId) {
    obj.appointmentVehicleId = appointmentVehicleId;
  }

  if (expressActivation) {
    obj.sendEmailToken = true;
  }

  return (dispatch) => {
    dispatch(request(obj));
    theService.createAccount(obj).then(
      (resp) => {
        dispatch(success(resp));
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

function requestEmailToken(email) {
  function request() {
    return { type: constants.REQUEST_EMAIL_TOKEN_REQUEST };
  }

  function success(payload) {
    return { type: constants.REQUEST_EMAIL_TOKEN_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.REQUEST_EMAIL_TOKEN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.requestEmailToken({ email }).then(
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

function sendEmailToken(email, token) {
  function request() {
    return { type: constants.SEND_EMAIL_TOKEN_REQUEST };
  }

  function success(user) {
    return { type: constants.SEND_EMAIL_TOKEN_SUCCESS, user };
  }

  function failure(error) {
    return { type: constants.SEND_EMAIL_TOKEN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.sendEmailToken({ email: email, emailToken: token }).then(
      (resp) => {
        if (resp.roles.includes("Customer")) {
          dispatch(success(resp.profile));
        } else {
          theService.logout(true);
          dispatch(failure("Esta conta não pode ser utilizada."));
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

function updateAccountPhoto(photo) {
  function request() {
    return { type: constants.UPDATE_ACCOUNT_PHOTO_REQUEST };
  }

  function success() {
    return { type: constants.UPDATE_ACCOUNT_PHOTO_SUCCESS };
  }

  function failure(error) {
    return { type: constants.UPDATE_ACCOUNT_PHOTO_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.updateAccountPhoto(photo).then(
      (resp) => {
        dispatch(success(resp));
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

function activateAccount(email, password, confirmPassword, code) {
  function request(email, code) {
    return { type: constants.ACTIVATEACCOUNT_REQUEST, email, code };
  }

  function success(user) {
    return { type: constants.ACTIVATEACCOUNT_SUCCESS, user };
  }

  function failure(error) {
    return { type: constants.ACTIVATEACCOUNT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(email, code));
    theService.activateAccount({ email, password, confirmPassword, code }).then(
      (resp) => {
        //dispatch(success());
        if (resp.roles.includes("Customer")) {
          dispatch(success(resp.profile));
        } else {
          theService.logout(true);
          dispatch(failure("Esta conta não pode ser utilizada."));
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

function resendActivationLink(email) {
  function request(email) {
    return { type: constants.ACTIVATEACCOUNT_REQUEST, email };
  }

  function success() {
    return { type: constants.ACTIVATEACCOUNT_SUCCESS };
  }

  function failure(error) {
    return { type: constants.ACTIVATEACCOUNT_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(email));
    theService.resendActivationLink(email).then(
      (resp) => {
        dispatch(success(email));
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

function setGTagUserId() {
  theService.setGTagUserId();
}

function isLoggedIn() {
  const prof = theService.getProfile();
  const roles = theService.getRoles();

  return !!(prof && prof.email && roles && roles.includes("Customer"));
}

const authActions = {
  login,
  logout,
  accountExist,
  isLoggedIn,
  checkSavedLogin,
  forgotPassword,
  createAccount,
  updateAccountPhoto,
  requestEmailToken,
  sendEmailToken,
  clearErrors,
  activateAccount,
  resendActivationLink,
  setGTagUserId
};

export {
  login,
  logout,
  accountExist,
  isLoggedIn,
  checkSavedLogin,
  forgotPassword,
  createAccount,
  updateAccountPhoto,
  requestEmailToken,
  sendEmailToken,
  clearErrors,
  activateAccount,
  resendActivationLink,
};

export default authActions;
