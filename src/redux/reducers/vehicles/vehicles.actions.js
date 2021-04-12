/*eslint eqeqeq: "off"*/

import constants from "./vehicles.constants";
import theService from "clientServices/vehicle";
import { FINANCE_MODES } from "src/components/GlobalConstants";

function getById(id, initialDeposit, financeMode, financeTypeId, numberOfMonths, annualMileage, recoveryValue) {
  function request(id) {
    return { type: constants.GET_BY_ID_REQUEST, id };
  }

  function success(payload) {
    return { type: constants.GET_BY_ID_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_BY_ID_FAILURE, error };
  }

  return (dispatch) => {
    //console.log('service =>', financeTypeId, initialDeposit, numberOfMonths, financeMode, annualMileage, recoveryValue);
    dispatch(request(id));
    theService
      .getById(
        id,
        initialDeposit,
        // financeMode === FINANCE_MODES[0].value && financeTypeId != 1? "" : financeTypeId,
        // financeMode === FINANCE_MODES[0].value ? "" : numberOfMonths,
        // financeMode === FINANCE_MODES[0].value ? "" : annualMileage,
        financeTypeId || "",
        numberOfMonths || "",
        annualMileage || "",
        recoveryValue
      )
      .then(
        (resp) => {
          if (resp.success && resp.data) {
            dispatch(success(resp.data));
          } else {
            dispatch(failure(resp.data));
          }
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };
}

function getVehicles(
  min,
  max,
  initialDeposit,
  financeMode,
  financeTypeId,
  numberOfMonths,
  annualMileage,
  brands,
  brandSegments,
  limitResults,
  isNew,
  engineTypes,
  colors,
  isManualTransmission,
  discountTypes,
  minKilometers,
  maxKilometers,
  vehicleOrderByProperty
) {
  function request() {
    return { type: constants.GET_FILTERED_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_FILTERED_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_FILTERED_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService
      .getVehicles(
        min,
        max,
        initialDeposit || 0,
        financeMode === FINANCE_MODES[0].value && financeTypeId != 1 ? "" : financeTypeId || "",
        financeMode === FINANCE_MODES[0].value ? "" : numberOfMonths || "",
        financeMode === FINANCE_MODES[0].value ? "" : annualMileage || "",
        brands,
        brandSegments,
        limitResults,
        isNew,
        engineTypes,
        colors,
        isManualTransmission,
        discountTypes,
        minKilometers,
        maxKilometers,
        vehicleOrderByProperty
      )
      .then(
        (resp) => {
          if (resp.success) {
            dispatch(success(resp.data));
          }
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };
}

function getVehiclesQuantities(
  initialDeposit,
  financeMode,
  financeTypeId,
  numberOfMonths,
  annualMileage,
  brands,
  brandSegments
) {
  function request() {
    return { type: constants.GET_VEHICLES_QUANTITIES_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_VEHICLES_QUANTITIES_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_VEHICLES_QUANTITIES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService
      .getVehiclesQuantities(
        initialDeposit || 0,
        // financeMode === FINANCE_MODES[0].value && financeTypeId != 1 ? "" : financeTypeId,
        // financeMode === FINANCE_MODES[0].value ? "" : numberOfMonths,
        // financeMode === FINANCE_MODES[0].value ? "" : annualMileage,
        financeTypeId || "",
        financeMode === FINANCE_MODES[0].value ? "" : numberOfMonths || "",
        annualMileage || "",
        brands,
        brandSegments
      )
      .then(
        (resp) => {
          if (resp.success) {
            dispatch(success(resp.data));
          }
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };
}

function getNextById(id, initialDeposit, financeMode, financeTypeId, numberOfMonths, annualMileage, recoveryValue) {
  function request(id) {
    return { type: constants.GET_NEXT_BY_ID_REQUEST, id };
  }

  function success(payload) {
    return { type: constants.GET_NEXT_BY_ID_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_NEXT_BY_ID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));
    theService.getNextById(id, initialDeposit, financeTypeId, numberOfMonths, annualMileage, recoveryValue).then(
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

function getSimpleById(id) {
  function request(id) {
    return { type: constants.GET_BY_ID_SIMPLE_REQUEST, id };
  }

  function success(payload) {
    return { type: constants.GET_BY_ID_SIMPLE_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_BY_ID_SIMPLE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));
    theService.getSimpleById(id).then(
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

function getFeaturesById(id) {
  function request(id) {
    return { type: constants.GET_FEATURES_BY_ID_REQUEST, id };
  }

  function success(payload) {
    return { type: constants.GET_FEATURES_BY_ID_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_FEATURES_BY_ID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(id));
    theService.getFeaturesById(id).then(
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

function setStaticData(data) {
  function success(payload) {
    return { type: constants.SET_STATIC_DATA, payload };
  }

  return (dispatch) => {
    dispatch(success(data));
  };
}

function registerEventGetVehicles(
  min,
  max,
  initialDeposit,
  financeMode,
  financeTypeId,
  numberOfMonths,
  annualMileage,
  brands,
  brandSegments,
  limitResults
) {
  return (dispatch) => {
    theService.registerEventGetVehicles(
      min,
      max,
      initialDeposit || 0,
      financeMode === FINANCE_MODES[0].value && financeTypeId != 1 ? "" : financeTypeId || "",
      financeMode === FINANCE_MODES[0].value ? "" : numberOfMonths || "",
      financeMode === FINANCE_MODES[0].value ? "" : annualMileage || "",
      brands,
      brandSegments,
      limitResults
    );
  };
}

function getEngineTypes() {
  function request() {
    return { type: constants.GET_ENGINE_TYPES_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_ENGINE_TYPES_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_ENGINE_TYPES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getEngineTypes().then(
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

function getColorTypes() {
  function request() {
    return { type: constants.GET_COLOR_TYPES_REQUEST };
  }

  function success(payload) {
    return { type: constants.GET_COLOR_TYPES_SUCCESS, payload };
  }

  function failure(error) {
    return { type: constants.GET_COLOR_TYPES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    theService.getColorTypes().then(
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

const vehicleActions = {
  getById,
  getVehicles,
  getVehiclesQuantities,
  getNextById,
  getSimpleById,
  getFeaturesById,
  setStaticData,
  registerEventGetVehicles,
  getEngineTypes,
  getColorTypes,
};

export default vehicleActions;
