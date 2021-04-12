import React, { Component } from "react";
import { connect } from "react-redux";
import { change, Field, formValueSelector, reduxForm } from "redux-form";
import { ButtonGroupField } from "src/components/FormComponents/ReduxFormFields/ButtonGroupField";
import { CheckboxField } from "src/components/FormComponents/ReduxFormFields/CheckboxField";
import { renderTextInput } from "src/components/FormComponents/ReduxFormRenders/InputsRenders";
import { isEmail, isPhoneNumber, isRequired } from "src/components/FormComponents/Validators/validators";
// import shoppingCartActions from "src/redux/reducers/shoppingCart/shoppingCart.actions";

export class NotifyMeWhenAvailable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifyMeRequestSuccess: false,
    };

    this.showResults = this.showResults.bind(this);
  }

  componentDidMount() {
    const { loggedIn, userEmail, userPhoneNumber, doChange } = this.props;

    if (loggedIn) {
      doChange("ac_email", userEmail || "");
      doChange("ac_phoneNumber", userPhoneNumber || "");
      doChange("ac_consentMarketingPolicy", true);
    }
  }

  componentDidUpdate(prevProps) {
    const { loading, requestErrors } = this.props;

    if (prevProps.loading && !loading && !requestErrors) {
      this.setState({ notifyMeRequestSuccess: true });
    }
  }

  showResults(obj, dispatch, props) {
    const { doClearErrors, nofityWhenAvailable, productId, variationId } = this.props;

    if ((obj.ac_contactType === "email" && obj.ac_email) || (obj.ac_contactType === "phone" && obj.ac_phoneNumber)) {
      doClearErrors();
      nofityWhenAvailable(
        productId,
        variationId,
        obj.ac_contactType === "email" ? obj.ac_email : "",
        obj.ac_contactType === "phone" ? obj.ac_phoneNumber : ""
      );
    }
  }

  render() {
    const { handleSubmit, ac_contactType, loading } = this.props;
    const { notifyMeRequestSuccess } = this.state;

    const CONTACT_TYPES = [
      {
        value: "email",
        label: "E-mail",
        icon: "fa fa-table",
      },
      {
        value: "phone",
        label: "SMS",
        icon: "fa fa-slack",
      },
    ];

    return (
      <form
        onSubmit={handleSubmit(this.showResults)}
        style={{ maxWidth: "360px" }}
        className="border-top pt-4 pb-3 mt-adapt-4 mb-4"
      >
        <p className="mb-3 listing-text font-weight-bold">Notificar-me quando houver stock</p>
        {notifyMeRequestSuccess ? (
          <p className="listing-text">Obrigado! Faremos os possíveis para voltar a ter stock.</p>
        ) : (
          <>
            <div className="tabs-group-fill mt-adapt-1 mb-4">
              <ButtonGroupField name="ac_contactType" options={CONTACT_TYPES} />
            </div>
            {ac_contactType === CONTACT_TYPES[0].value && (
              <Field
                placeholder=""
                label="E-mail"
                name="ac_email"
                type="email"
                autoComplete="off"
                classNameInput="bg-transparent"
                component={renderTextInput}
                required={true}
                validate={[isRequired, isEmail]}
              />
            )}
            {ac_contactType === CONTACT_TYPES[1].value && (
              <Field
                placeholder=""
                label="Telemóvel"
                name="ac_phoneNumber"
                type="text"
                required={true}
                component={renderTextInput}
                validate={[isRequired, isPhoneNumber]}
              />
            )}
            <CheckboxField
              id="ac_consentMarketingPolicy"
              name="ac_consentMarketingPolicy"
              className=""
              validate={[isRequired]}
              label={"Gostaria de receber comunicações de marketing da BMcar."}
            />
            <button type="submit" className="btn btn-primary mt-adapt-3 px-5 pt-2 font-weight-bold" disabled={loading}>
              Notificar-me
            </button>
          </>
        )}
      </form>
    );
  }
}

const FORM_NAME = "product";
const selector = formValueSelector(FORM_NAME);

NotifyMeWhenAvailable = reduxForm({
  form: FORM_NAME,
})(NotifyMeWhenAvailable);

const mapStateToProps = (state) => {
  const { shoppingCart, auth } = state;

  const ac_contactType = selector(state, "ac_contactType");

  return {
    ac_contactType,
    loggedIn: false, //auth.loggedIn,
    userEmail: false, //auth.user && auth.user.email,
    userPhoneNumber:false, // auth.user && auth.user.phoneNumber,
    loading: false, //shoppingCart.loadingNotifyWhenAvailable,
    requestErrors: false, //shoppingCart.error,
    initialValues: {
      ac_contactType: "email",
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doChange: (y, z) => true, //dispatch(change(FORM_NAME, y, z)),
    doClearErrors: () => true,//dispatch(shoppingCartActions.clearErrors()),
    nofityWhenAvailable: (productId, variationId, email, phoneNumber) => {
      return true; //dispatch(shoppingCartActions.nofityWhenAvailable(productId, variationId, email, phoneNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyMeWhenAvailable);
