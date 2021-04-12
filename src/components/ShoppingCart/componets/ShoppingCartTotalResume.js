import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { DELIVERY_TYPES } from "src/components/GlobalConstants";
import { EuroFormat2Decimals } from "src/components/Helpers/valuesFormatters";

export class ShoppingCartTotalResume extends Component {
  render() {
    const {
      subTotalWithVAT,
      totalDiscountCoupons,
      totalDiscountWithVAT,
      deliveryCharges,
      cartTotalWithVAT,
      hasCoupon,
      pickupOnStore
    } = this.props;

    return (
      <div className="row listing_text">
        <span className="col-3">Subtotal</span>
        <span className="col-9 text-right mb-1 text-dark-grey">{EuroFormat2Decimals(subTotalWithVAT)}</span>
        {totalDiscountWithVAT > 0 && (
          <>
            <span className="col-3">Desconto</span>
            <span className="col-9 text-right text-danger mb-1">-{EuroFormat2Decimals(totalDiscountWithVAT)}</span>
          </>
        )}
        {hasCoupon && (
          <>
            <span className="col-3">Cupão</span>
            <span className="col-9 text-right text-danger mb-1">-{EuroFormat2Decimals(totalDiscountCoupons)}</span>
          </>
        )}
        <span className="col-3">Envio</span>
        <span className="col-9 text-right mb-1">
          {deliveryCharges > 0 ? EuroFormat2Decimals(deliveryCharges) : "GRÁTIS"}{pickupOnStore && <p className="listing_small ml-2 text-dark-grey">Levantamento em Loja</p>}
        </span>
        <span className="col-3 font-weight-bold">Total</span>
        <span className="col-9 text-right font-weight-bold">{EuroFormat2Decimals(cartTotalWithVAT)}</span>
      </div>
    );
  }
}

const FORM_NAME = "findvehicle";
const selector = formValueSelector(FORM_NAME);

const mapStateToProps = (state) => {
  const { shoppingCart } = state;

  const co_deliveryType = selector(state, "co_deliveryType");

  return {
    pickupOnStore: co_deliveryType === DELIVERY_TYPES[0].value,
    subTotalWithVAT: shoppingCart.cart && shoppingCart.cart.priceWithoutDiscount,
    totalDiscountWithVAT: shoppingCart.cart && shoppingCart.cart.discountProducts,
    cartTotalWithVAT:
      co_deliveryType === DELIVERY_TYPES[0].value
        ? shoppingCart.cart && shoppingCart.cart.price - shoppingCart.cart.deliveryCharges
        : shoppingCart.cart && shoppingCart.cart.price,
    totalDiscountCoupons: shoppingCart.cart && shoppingCart.cart.discountCoupons,
    deliveryCharges:
      co_deliveryType === DELIVERY_TYPES[0].value ? 0 : shoppingCart.cart && shoppingCart.cart.deliveryCharges,
    hasCoupon: shoppingCart.cart && shoppingCart.cart.coupon && shoppingCart.cart.coupon.id,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTotalResume);
