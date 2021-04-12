import constants from "./corporate.constants";

const initialState = {
  loadingCompanyInfo: false,
  loadingAssociateToCompany: false,
  isToAcceptCompany: false,
};
const clearErrors = { message: undefined, error: undefined, isToAcceptCompany: false };

export function corporate(state = initialState, action) {
  switch (action.type) {
    case constants.GET_COMPANY_INFO_REQUEST:
      return Object.assign({}, state, {
        loadingCompanyInfo: true,
      });
    case constants.GET_COMPANY_INFO_SUCCESS:
      return Object.assign({}, state, {
        loadingCompanyInfo: false,
        item: action.payload,
      });
    case constants.GET_COMPANY_INFO_FAILURE:
      return Object.assign({}, state, {
        loadingCompanyInfo: false,
        error: action.error,
      });

    case constants.ASSOCIATE_TO_COMPANY_REQUEST:
      return Object.assign({}, state, {
        loadingAssociateToCompany: true,
        isToAcceptCompany: false,
      });
    case constants.ASSOCIATE_TO_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        loadingAssociateToCompany: false,
        isToAcceptCompany: action.payload && action.payload.isToAcceptCompany,
      });
    case constants.ASSOCIATE_TO_COMPANY_FAILURE:
      return Object.assign({}, state, {
        loadingAssociateToCompany: false,
        error: action.error,
      });

    case constants.GET_OPEN_ASSOCIATION_REQUESTS_REQUEST:
      return Object.assign({}, state, {
        loadingAssociationRequests: true,
      });
    case constants.GET_OPEN_ASSOCIATION_REQUESTS_SUCCESS:
      return Object.assign({}, state, {
        loadingAssociationRequests: false,
        associationRequest: action.payload,
      });
    case constants.GET_OPEN_ASSOCIATION_REQUESTS_FAILURE:
      return Object.assign({}, state, {
        loadingAssociationRequests: false,
        error: action.error,
      });

    case constants.CANCEL_ASSOCIATION_REQUEST_REQUEST:
      return Object.assign({}, state, {
        loadingCancelAssociation: true,
      });
    case constants.CANCEL_ASSOCIATION_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loadingCancelAssociation: false,
      });
    case constants.CANCEL_ASSOCIATION_REQUEST_FAILURE:
      return Object.assign({}, state, {
        loadingCancelAssociation: false,
        error: action.error,
      });

    case constants.UPLOAD_DOCUMENT_ASSOCIATION_REQUEST_REQUEST:
      return Object.assign({}, state, {
        loadingUploadDocument: true,
      });
    case constants.UPLOAD_DOCUMENT_ASSOCIATION_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loadingUploadDocument: false,
      });
    case constants.UPLOAD_DOCUMENT_ASSOCIATION_REQUEST_FAILURE:
      return Object.assign({}, state, {
        loadingUploadDocument: false,
        error: action.error,
      });

    case constants.SEND_CERTIFICATION_CODE_ASSOCIATION_REQUEST_REQUEST:
      return Object.assign({}, state, {
        loadingSendCertificationCode: true,
      });
    case constants.SEND_CERTIFICATION_CODE_ASSOCIATION_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loadingSendCertificationCode: false,
      });
    case constants.SEND_CERTIFICATION_CODE_ASSOCIATION_REQUEST_FAILURE:
      return Object.assign({}, state, {
        loadingSendCertificationCode: false,
        error: action.error,
      });

    case constants.MODEL_DISCOUNT_REQUEST_REQUEST:
      return Object.assign({}, state, {
        loadingModelDiscountRequest: true,
      });
    case constants.MODEL_DISCOUNT_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loadingModelDiscountRequest: false,
      });
    case constants.MODEL_DISCOUNT_REQUEST_FAILURE:
      return Object.assign({}, state, {
        loadingModelDiscountRequest: false,
        error: action.error,
      });

    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);
    default:
      return state;
  }
}

export default corporate;
