import constants from "./forms.constants";

function setField(formName, field, value) {
  function setFormField(formName, field, value) {
    return { type: constants.SET_FIELD_VALUE, formName, field, value };
  }
  return dispatch => {
    dispatch(setFormField(formName, field, value));
  };
}

function setForm(formName, formData) {
  function setFormData(formName, formData) {
    return { type: constants.SET_FORM_DATA, formName, formData };
  }
  
  return dispatch => {
    dispatch(setFormData(formName, formData));
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
  setForm,
  setField,
  clearErrors
};

export default brandActions;
