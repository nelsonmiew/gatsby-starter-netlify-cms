import constants from "./vipEvent.constants";
import theService from "clientServices/vipEvent";

function getNextEventInfo() {
  function request() { return { type: constants.GET_NEXT_EVENT_INFO_REQUEST }; }
  function success(payload) { return { type: constants.GET_NEXT_EVENT_INFO_SUCCESS, payload }; }
  function failure(error) { return { type: constants.GET_NEXT_EVENT_INFO_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());
    theService.getNextEventInfo().then(
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


const vipEventActions = {
  getNextEventInfo
};

export {
  getNextEventInfo
};

export default vipEventActions;
