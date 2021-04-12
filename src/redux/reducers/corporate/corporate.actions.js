import constants from "./corporate.constants";
import theService from "clientServices/corporate";

function getCompanyInfo(vatNumber) {
  function request() {
    return { type: constants.GET_COMPANY_INFO_REQUEST };
  }
  function success(payload) {
    return { type: constants.GET_COMPANY_INFO_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.GET_COMPANY_INFO_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getCompanyInfo(vatNumber).then(
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

function associateToCompany(vatNumber, numberVehicles, isOwner) {
  function request() {
    return { type: constants.ASSOCIATE_TO_COMPANY_REQUEST };
  }
  function success(payload) {
    return { type: constants.ASSOCIATE_TO_COMPANY_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.ASSOCIATE_TO_COMPANY_FAILURE, error };
  }

  const companyObj = {
    vatNumber: vatNumber,
    numberVehicles,
    isOwner: isOwner,
    isToUpdateFleet: false,
  };

  return (dispatch) => {
    dispatch(request());
    theService.associateToCompany(companyObj).then(
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

function getAssociationRequests() {
  function request() {
    return { type: constants.GET_OPEN_ASSOCIATION_REQUESTS_REQUEST };
  }
  function success(payload) {
    return { type: constants.GET_OPEN_ASSOCIATION_REQUESTS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.GET_OPEN_ASSOCIATION_REQUESTS_FAILURE, error };
  }

  return async (dispatch) => {
    dispatch(request());
    await theService.getAssociationRequests().then(
      async (resp) => {
        if (resp.success) {
          if (resp.data && resp.data.documentAssociateToCompanyRequests) {
            for (const file of resp.data.documentAssociateToCompanyRequests.filter(
              (d) => !d.extension.startsWith(".pdf")
            )) {
              await theService.getSubmitedDocById(resp.data.id, file.id).then(
                (resp) => {
                  file.preview = resp;
                },
                (error) => {
                  file.preview = null;
                }
              );
            }
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

function cancelAssociationRequest(id) {
  function request() {
    return { type: constants.CANCEL_ASSOCIATION_REQUEST_REQUEST };
  }
  function success(payload) {
    return { type: constants.CANCEL_ASSOCIATION_REQUEST_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.CANCEL_ASSOCIATION_REQUEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.cancelAssociationRequest(id).then(
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

function uploadDocumentAssociationRequest(id, file, docId) {
  function request() {
    return { type: constants.UPLOAD_DOCUMENT_ASSOCIATION_REQUEST_REQUEST };
  }
  function success(payload) {
    return { type: constants.UPLOAD_DOCUMENT_ASSOCIATION_REQUEST_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.UPLOAD_DOCUMENT_ASSOCIATION_REQUEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.uploadDocumentAssociationRequest(id, { file: file }, docId).then(
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

function downloadAssociationRequestDocument(id, docId) {
  return (dispatch) => {
    theService.downloadAssociationRequestDocument(id, docId).then(
      (resp) => {},
      (error) => {}
    );
  };
}

function sendCertificationCodeAssociationRequest(id, certificationCode) {
  function request() {
    return { type: constants.SEND_CERTIFICATION_CODE_ASSOCIATION_REQUEST_REQUEST };
  }
  function success(payload) {
    return { type: constants.SEND_CERTIFICATION_CODE_ASSOCIATION_REQUEST_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.SEND_CERTIFICATION_CODE_ASSOCIATION_REQUEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.sendCertificationCodeAssociationRequest(id, { certificationCode }).then(
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

function modelDiscountRequest(modelId) {
  function request() {
    return { type: constants.MODEL_DISCOUNT_REQUEST_REQUEST };
  }
  function success(payload) {
    return { type: constants.MODEL_DISCOUNT_REQUEST_SUCCESS, payload };
  }
  function failure(error) {
    return { type: constants.MODEL_DISCOUNT_REQUEST_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.modelDiscountRequest({ modelId: modelId }).then(
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

function clearErrors() {
  function request() {
    return { type: constants.CLEAR_ERRORS };
  }
  return (dispatch) => {
    dispatch(request());
  };
}

const corporateActions = {
  getCompanyInfo,
  associateToCompany,
  getAssociationRequests,
  cancelAssociationRequest,
  uploadDocumentAssociationRequest,
  downloadAssociationRequestDocument,
  sendCertificationCodeAssociationRequest,
  modelDiscountRequest,
  clearErrors,
};

export default corporateActions;
