import SampleConstants from './sample.constants';
import theService from 'clientServices/sample'


function getAll () {
    function request() { return { type: SampleConstants.GET_ALL_REQUEST }; }
    function success(payload) { return { type: SampleConstants.GET_ALL_SUCCESS, payload }; }
    function failure(error) { return { type: SampleConstants.GET_ALL_FAILURE, error }; }      
    return (dispatch) => {
      dispatch(request());
      // call the service
      theService.getAll()
        .then(
          (resp) => {
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
      },
        );
    };
  }

  function getById () {
    function request() { return { type: SampleConstants.GET_ALL_REQUEST }; }
    function success(payload) { return { type: SampleConstants.GET_ALL_SUCCESS, payload }; }
    function failure(error) { return { type: SampleConstants.GET_ALL_FAILURE, error }; }
    
    return (dispatch) => {
      dispatch(request());
      // call the service
    //   personalNoteServiceClient.getAllofLoggedParticipant()
    //     .then(
    //       (resp) => {
    //         if (resp.success) {
    //           dispatch(success(resp.data));
    //         }
    //       },
    //       error => {
        // if (error.status) {
        //   dispatch(failure(error.message, error.status));
        // } else {
        //   dispatch(failure(error));
        // }
      }
  
  }

  const sampleActions  = {
    getAll, getById
  }

  export default  sampleActions;