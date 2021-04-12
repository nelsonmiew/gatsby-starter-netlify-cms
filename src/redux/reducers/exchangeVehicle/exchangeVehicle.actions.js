import ExchangeVehicleConstants from "./exchangeVehicle.constants";
import theService from "clientServices/exchangeVehicle";
import { EXCHANGE_VEHICLE_STEPS } from "src/components/GlobalConstants";

function calculate(plateNumber, numberKilometers, vehicleStatus) {
  function request() {
    return { type: ExchangeVehicleConstants.CREATE_REQUEST };
  }

  function success(payload) {
    return { type: ExchangeVehicleConstants.CREATE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ExchangeVehicleConstants.CREATE_FAILURE, error };
  }

  const exchangeObj = {
    plateNumber: plateNumber,
    kilometers: numberKilometers,
    status: vehicleStatus + 1
  };

  return dispatch => {
    dispatch(request());
    theService.calculate(exchangeObj).then(
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

function requestSmsToken(plateNumber, numberKilometers, phoneNumber, rating) {
  function request() {
    return { type: ExchangeVehicleConstants.CREATE_REQUEST };
  }

  function success(payload) {
    return { type: ExchangeVehicleConstants.CREATE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ExchangeVehicleConstants.CREATE_FAILURE, error };
  }

  const exchangeObj = {
    plateNumber: plateNumber.toUpperCase().replace(/-/g, ''),
    kilometers: numberKilometers,
    phoneNumber: phoneNumber,
    status: rating + 1,
    step: EXCHANGE_VEHICLE_STEPS.GENERATE_SMS_TOKEN
  };

  return dispatch => {
    dispatch(request());
    theService.calculate(exchangeObj).then(
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

function sendSmsToken(exchangeVehicleId, smsToken, rating) {
  function request() {
    return { type: ExchangeVehicleConstants.CREATE_REQUEST };
  }

  function success(payload) {
    return { type: ExchangeVehicleConstants.CREATE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ExchangeVehicleConstants.CREATE_FAILURE, error };
  }

  const exchangeObj = {
    id: exchangeVehicleId,
    smsToken: smsToken,
    status: rating + 1,
    step: EXCHANGE_VEHICLE_STEPS.CALCULATE_BY_PLATE_NUMBER
  };

  return dispatch => {
    dispatch(request());
    theService.calculate(exchangeObj).then(
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

function calculateFromVersion(exchangeVehicleId, smsToken, rating, versionId) {
  function request() {
    return { type: ExchangeVehicleConstants.CREATE_REQUEST };
  }

  function success(payload) {
    return { type: ExchangeVehicleConstants.CREATE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: ExchangeVehicleConstants.CREATE_FAILURE, error };
  }

  const exchangeObj = {
    id: exchangeVehicleId,
    smsToken: smsToken,
    status: rating + 1,
    versionCode: versionId,
    step: EXCHANGE_VEHICLE_STEPS.CALCULATE_BY_VEHICLE_FORM
  };

  return dispatch => {
    dispatch(request());
    theService.calculate(exchangeObj).then(
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

function getBrands() {
  function request() {
    return { type: ExchangeVehicleConstants.GET_BRANDS_REQUEST };
  }
  function success(payload) {
    return { type: ExchangeVehicleConstants.GET_BRANDS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: ExchangeVehicleConstants.GET_BRANDS_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    theService.getBrands().then(
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

function getFuels() {
  function request() {
    return { type: ExchangeVehicleConstants.GET_FUELS_REQUEST };
  }
  function success(payload) {
    return { type: ExchangeVehicleConstants.GET_FUELS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: ExchangeVehicleConstants.GET_FUELS_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    theService.getFuels().then(
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

function getModels(brandId, fuelId, year) {
  function request() {
    return { type: ExchangeVehicleConstants.GET_MODELS_REQUEST };
  }
  function success(payload) {
    return { type: ExchangeVehicleConstants.GET_MODELS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: ExchangeVehicleConstants.GET_MODELS_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    theService.getModels(brandId, fuelId, year).then(
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

function getVersions(brandId, fuelId, modelId) {
  function request() {
    return { type: ExchangeVehicleConstants.GET_VERSIONS_REQUEST };
  }
  function success(payload) {
    return { type: ExchangeVehicleConstants.GET_VERSIONS_SUCCESS, payload };
  }
  function failure(error) {
    return { type: ExchangeVehicleConstants.GET_VERSIONS_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    theService.getVersions(brandId, fuelId, modelId).then(
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

function clearVehicle() {
  function request() {
    return { type: ExchangeVehicleConstants.CLEAR };
  }

  return dispatch => {
    dispatch(request());
  };
}

function clearErrors() {
  function request() {
    return { type: ExchangeVehicleConstants.CLEAR_ERRORS };
  }

  return dispatch => {
    dispatch(request());
  };
}

const exchangeVehicleActions = {
  calculate,
  requestSmsToken,
  sendSmsToken,
  calculateFromVersion,
  getBrands,
  getFuels,
  getModels,
  getVersions,
  clearVehicle,
  clearErrors
};

export default exchangeVehicleActions;
