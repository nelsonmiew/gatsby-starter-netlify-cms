import authActions from "reducers/authentication/auth.actions";
import financeTypesAction from "reducers/financeTypes/financeTypes.actions";
import shoppingCartActions from "../shoppingCart/shoppingCart.actions";
import userActions from "../account/account.actions";

function initializeApp() {
  return dispatch => {
    dispatch(financeTypesAction.getAll());
    dispatch(shoppingCartActions.getCart());
    dispatch(authActions.checkSavedLogin());
    dispatch(userActions.getFavoritesIds());

    if (authActions.isLoggedIn()) {
      dispatch(userActions.getQuotations());
      dispatch(userActions.getReservations());
      dispatch(userActions.getMyCompanyDetail());
      authActions.setGTagUserId();
    }    
  };
}

export default { initializeApp };
