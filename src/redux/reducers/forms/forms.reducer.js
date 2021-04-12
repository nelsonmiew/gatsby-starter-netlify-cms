import constants from './forms.constants';
// import { GlobalReducer, GlobalInitialState } from 'reducers/global'
const initialState = {}
const clearErrors = { message: undefined, error: undefined }

export function forms(state = initialState, action) {

    switch (action.type) {
        case constants.SET_FIELD_VALUE:            
            const theForm = state[action.formName] || {};
            theForm[action.field] = action.value;
            return Object.assign({}, state, { [action.formName]: theForm });
        case constants.SET_FORM_DATA:
            return Object.assign({}, state, { [action.formName]: action.formData });
        case constants.CLEAR_ERRORS:
            return Object.assign({}, state, clearErrors);
        default:
            return state
    }
}

export default forms;