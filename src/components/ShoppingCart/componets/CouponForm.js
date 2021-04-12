import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { EuroFormat2Decimals } from "src/components/Helpers/valuesFormatters";
import shoppingCartActions from "src/redux/reducers/shoppingCart/shoppingCart.actions";

export class CouponForm extends Component {
  constructor(props) {
    super(props);

    this.applyCouponCode = this.applyCouponCode.bind(this);
    this.removeCouponCode = this.removeCouponCode.bind(this);
  }

  applyCouponCode() {
    const { co_coupon, applyCoupon } = this.props;

    if (co_coupon) {
      applyCoupon(co_coupon);
    }
  }

  removeCouponCode() {
    const { couponId, removeCoupon } = this.props;

    if (couponId) {
      removeCoupon(couponId);
    }
  }

  render() {
    const {
      loadingShoppingCart,
      loadingAddProductToCart,
      loadingApplyCouponToCart,
      totalSpentCoupons,
      couponId,
      couponCode,
      couponDescription,
      couponMinSpent,
      couponMaxSpent,
      couponErrors,
    } = this.props;

    return (
      <div className="row mt-2">
        <div className="col-12">
          <label className="small d-block mb-0" htmlFor="co_coupon">
            Cupão
          </label>
        </div>
        <div className="col-12 d-flex">
          <Field
            id="co_coupon"
            name="co_coupon"
            type="text"
            component="input"
            className={
              "w-70 form-control d-inline-block listing_text mb-0 text-uppercase" +
              (couponId ? " disabled" : "") +
              ((totalSpentCoupons < couponMinSpent || totalSpentCoupons > couponMaxSpent) > 0 ? " is-invalid" : "")
            }
            maxLength={12}
            placeholder={couponId ? "Cupão: " + couponCode : "Código Promocional"}
            disabled={couponId}
          />
          {couponId ? (
            <button
              className="btn btn-dark listing_text w-30"
              type="button"
              disabled={loadingApplyCouponToCart || loadingShoppingCart || loadingAddProductToCart}
              onClick={this.removeCouponCode}
            >
              Remover
            </button>
          ) : (
            <button
              className="btn btn-dark listing_text w-30"
              type="button"
              disabled={loadingApplyCouponToCart || loadingShoppingCart || loadingAddProductToCart}
              onClick={this.applyCouponCode}
            >
              Aplicar
            </button>
          )}
        </div>
        <div className="col-12">
          {couponId && <p className="text-muted listing_small">{couponDescription}</p>}
          {couponErrors && couponErrors.length > 0 && <p className="text-danger listing_small">{couponErrors[0]}</p>}
          {couponId && totalSpentCoupons === 0 && (
            <p className="text-danger listing_small">Este cupão não é valido para nenhum produto do carrinho.</p>
          )}
          {couponId &&
            totalSpentCoupons > 0 &&
            (totalSpentCoupons < couponMinSpent || totalSpentCoupons > couponMaxSpent) && (
              <p className="text-danger listing_small">
                Este cupão só é válido se gastar entre {EuroFormat2Decimals(couponMinSpent)} e{" "}
                {EuroFormat2Decimals(couponMaxSpent)} no produto indicado.
              </p>
            )}
        </div>
      </div>
    );
  }
}

const FORM_NAME = "product";
const selector = formValueSelector(FORM_NAME);

CouponForm = reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(CouponForm);

const mapStateToProps = (state) => {
  const { shoppingCart } = state;

  const co_coupon = selector(state, "co_coupon");

  return {
    co_coupon,
    //cart
    loadingShoppingCart: shoppingCart.loadingShoppingCart,
    loadingAddProductToCart: shoppingCart.loadingAddProductToCart,
    couponId: shoppingCart.cart && shoppingCart.cart.coupon && shoppingCart.cart.coupon.id,
    couponCode: shoppingCart.cart && shoppingCart.cart.coupon && shoppingCart.cart.coupon.code,
    couponDescription: shoppingCart.cart && shoppingCart.cart.coupon && shoppingCart.cart.coupon.description,
    couponMinSpent: shoppingCart.cart && shoppingCart.cart.coupon && shoppingCart.cart.coupon.minSpent,
    couponMaxSpent: shoppingCart.cart && shoppingCart.cart.coupon && shoppingCart.cart.coupon.maxSpent,
    couponErrors: shoppingCart.couponError,
    totalSpentCoupons: shoppingCart.cart && shoppingCart.cart.totalSpentCoupons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyCoupon: (code) => {
      dispatch(shoppingCartActions.applyCoupon(code));
    },
    removeCoupon: (id) => {
      dispatch(shoppingCartActions.removeCoupon(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponForm);
