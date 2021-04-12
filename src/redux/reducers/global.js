export function GlobalReducer(state, constants, action) {
    const result = { found: true, state };
    switch (action.type) {
        //GET ALL
        case constants["GET_ALL_REQUEST"]:
            
            result.state = Object.assign({},state, {
                loadingGetAll: true                 
              })
            break;
        case constants["GET_ALL_SUCCESS"]:
             result.state = Object.assign({},state, {loadingGetAll: false, items: action.payload });
            break;
        case constants["GET_ALL_FAILURE"]:
             result.state = Object.assign({},state, {loadingGetAll: false, error: action.error });
            break;

        //GET BY ID
        case constants["GET_BY_ID_REQUEST"]:
             result.state = Object.assign({},state, {loadingGetById: true });
            break;
        case constants["GET_BY_ID_SUCCESS"]:
             result.state = Object.assign({},state, {loadingGetById: false, item: action.payload });
            break;
        case constants["GET_BY_ID_FAILURE"]:
             result.state = Object.assign({},state, {loadingGetById: false, error: action.error });
            break;

        case constants["CREATE_REQUEST"]:
             result.state = Object.assign({},state, {loadingCreate: true });
            break;
        case constants["CREATE_SUCCESS"]:
             result.state = Object.assign({},state, {loadingCreate: false, item: action.payload });
            break;
        case constants["CREATE_FAILURE"]:
             result.state = Object.assign({},state, {loadingCreate: false, error: action.error });
            break;

        case constants["UPDATE_REQUEST"]:
             result.state = Object.assign({},state, {loadingUpdate: true });
            break;
        case constants["UPDATE_SUCCESS"]:
             result.state = Object.assign({},state, {loadingUpdate: false, item: action.payload });
            break;
        case constants["UPDATE_FAILURE"]:
             result.state = Object.assign({},state, {loadingUpdate: false, error: action.error });
            break;
        case constants["DELETE_REQUEST"]:
             result.state = Object.assign({},state, {loadingDelete: true });
            break;
        case constants["DELETE_SUCCESS"]:
            let newItems = state.items;
            if (state.items && state.items.length > 0 && action.id) {
                newItems = state.items.filter(obj => obj.id !== action.id)
            }
             result.state = Object.assign({},state, {loadingDelete: false, items: newItems });
            break;
        case constants["DELETE_FAILURE"]:
             result.state = Object.assign({},state, {loadingDelete: false, error: action.error });
            break;

        default:
            return { found: false, state };
    }

    return result;
}

export const GlobalInitialState = {
    loadingGetAll: false,
    loadingGetById: false,
    loadingCreate: false,
    loadingUpdate: false,
    loadingDelete: false
}