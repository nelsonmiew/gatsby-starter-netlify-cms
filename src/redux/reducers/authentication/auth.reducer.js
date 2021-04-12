import constants from "./auth.constants";

const initialState = {
  loadingLogin: false,
  loadingForgotPassword: false,
  loadingCreateAccount: false,
  loadingUpdatePhotoAccount: false,
};

const clearErrors = { message: undefined, error: undefined, passwordResetOk: undefined, errorForgot: undefined };

export function auth(state = initialState, action) {
  switch (action.type) {
    //login
    case constants.LOGIN_REQUEST:
      return Object.assign({}, state, { loggedIn: false, loadingLogin: true, user: action.user }, clearErrors);

    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loadingLogin: false,
        user: action.user,
        loggedIn: true,
      });

    case constants.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loadingLogin: false,
        error: action.error,
      });

    //account exist
    case constants.ACCOUNT_EXIST_REQUEST:
      return Object.assign(
        {},
        state,
        {
          loadingAccountExist: true,
          accountExist: false,
        },
        clearErrors
      );

    case constants.ACCOUNT_EXIST_SUCCESS:
      return Object.assign({}, state, {
        loadingAccountExist: false,
        accountExist: false,
        email: action.email,
      });

    case constants.ACCOUNT_EXIST_FAILURE:
      return Object.assign({}, state, {
        loadingAccountExist: false,
        accountExist: true,
        error: action.error,
      });

    //reset password
    case constants.FORGOTPASSWORD_REQUEST:
      return Object.assign({}, state, {
        loadingForgotPassword: true,
        user: action.user,
        errorForgot: undefined,
        messageForgot: undefined,
      });

    case constants.FORGOTPASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loadingForgotPassword: false,
        passwordResetOk: true,
        messageForgot: action.message,
      });

    case constants.FORGOTPASSWORD_FAILURE:
      return Object.assign({}, state, {
        loadingForgotPassword: false,
        passwordResetOk: false,
        errorForgot: action.error,
        messageForgot: action.message,
      });

    //logout
    case constants.LOGOUT:
      return {};

    //create account
    case constants.CREATE_CLIENT_REQUEST:
      return Object.assign({}, state, { loadingCreateAccount: true, user: action.user }, clearErrors);

    case constants.CREATE_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        loadingCreateAccount: false,
        user: { id: action.user ? action.user.data : "" },
      });

    case constants.CREATE_CLIENT_FAILURE:
      return Object.assign({}, state, {
        loadingCreateAccount: false,
        error: action.error,
      });

    case constants.REQUEST_EMAIL_TOKEN_REQUEST:
      return Object.assign({}, state, { loadingRequestEmailToken: true }, clearErrors);

    case constants.REQUEST_EMAIL_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        loadingRequestEmailToken: false,
      });

    case constants.REQUEST_EMAIL_TOKEN_FAILURE:
      return Object.assign({}, state, {
        loadingRequestEmailToken: false,
        error: action.error,
      });

    case constants.SEND_EMAIL_TOKEN_REQUEST:
      return Object.assign({}, state, { loadingSendEmailToken: true }, clearErrors);

    case constants.SEND_EMAIL_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        loadingSendEmailToken: false,
        user: action.user,
        loggedIn: true,
      });

    case constants.SEND_EMAIL_TOKEN_FAILURE:
      return Object.assign({}, state, {
        loadingSendEmailToken: false,
        error: action.error,
      });

    //update photo
    case constants.UPDATE_ACCOUNT_PHOTO_REQUEST:
      return Object.assign({}, state, { loadingUpdatePhotoAccount: true }, clearErrors);

    case constants.UPDATE_ACCOUNT_PHOTO_SUCCESS:
      return Object.assign({}, state, {
        loadingUpdatePhotoAccount: false,
      });

    case constants.UPDATE_ACCOUNT_PHOTO_FAILURE:
      return Object.assign({}, state, {
        loadingUpdatePhotoAccount: false,
        error: action.error,
      });

    //activate account
    case constants.ACTIVATEACCOUNT_REQUEST:
      return Object.assign({}, state, { loadingActivateAccount: true, user: action.user }, clearErrors);

    case constants.ACTIVATEACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        loadingActivateAccount: false,
        user: action.user,
        loggedIn: true,
      });

    case constants.ACTIVATEACCOUNT_FAILURE:
      return Object.assign({}, state, {
        loadingActivateAccount: false,
        error: action.error,
      });

    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);

    default:
      return state;
  }
}

export default auth;
