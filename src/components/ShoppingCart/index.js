import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "gatsby";
import shoppingCartActions from "src/redux/reducers/shoppingCart/shoppingCart.actions";
import { PRODUCT_CHECKOUT_PATH, STORE_PATH } from "../GlobalConstants";
import CartItem from "./componets/CartItem";
import CouponForm from "./componets/CouponForm";
import PendentProducts from "./componets/PendentProducts";
import ShoppingCartTotalResume from "./componets/ShoppingCartTotalResume";

export class index extends Component {
  changeQuantity = (productId, variationId, quantity, productName, variationName, categoryName, price) => {
    const { addToCart } = this.props;

    addToCart(productId, variationId, quantity, productName, variationName, categoryName, price);
  };

  removeItem = (productId, variationId) => {
    const { removeFromCart } = this.props;

    removeFromCart(productId, variationId);
  };

  acceptRejectPendentItem = (productId, variationId, isToAccept) => {
    const { acceptRejectPendentProduct } = this.props;

    acceptRejectPendentProduct(productId, variationId, isToAccept);
  };

  goToCheckout() {
    navigate(STORE_PATH + PRODUCT_CHECKOUT_PATH);
  }

  render() {
    const {
      products,
      hasPendentProducts,
      loadingShoppingCart,
      loadingAddProductToCart,
      requestErrors,
      addedProductId,
      addedVariationId,
      closeCartHandle,
      couponHasErrors,
    } = this.props;

    return (
      <div className="cart-list h-100 overflow-hidden">
        <div className="container h-100 p-0">
          <div className="row h-100 flex-column flex-nowrap">
            {(products && products.length > 0) || hasPendentProducts ? (
              <>
                <div className="col-12 flex-fill overflow-auto h-100">
                  {hasPendentProducts && (
                    <PendentProducts
                      observer={this.props.observer}
                      acceptRejectPendentItem={this.acceptRejectPendentItem}
                    />
                  )}
                  {products && products.length > 0 && (
                    <div className="row ml-3 mr-3">
                      <div className="col-12 pt-3">
                        {products.map((item, i) => (
                          <Fragment key={"cart-item-" + i}>
                            <CartItem
                              item={item}
                              changeQuantityHandle={this.changeQuantity}
                              removeItemHandle={this.removeItem}
                              loadingAddProductToCart={loadingAddProductToCart}
                              addedProductId={addedProductId}
                              addedVariationId={addedVariationId}
                              couponHasErrors={couponHasErrors}
                              requestErrors={requestErrors}
                              observer={this.props.observer}
                            />
                            <hr />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-12 flex-fill flex-shrink-0 bg-pale-grey">
                  <div className="row listing_text ml-3 mr-3">
                    <div className="col-12 pt-3">
                      <ShoppingCartTotalResume />
                      <CouponForm />
                      <hr />
                      <div className="row mt-2 mb-4">
                        <div className="col-12 d-flex">
                          <button
                            className="button-big listing_text font-weight-bold w-100"
                            onClick={this.goToCheckout}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {loadingShoppingCart ? (
                  <div className="col-12 text-center d-flex">
                    <div className="w-100 align-self-center">
                      <p>A carregar o seu carrinho de compras...</p>
                    </div>
                  </div>
                ) : (
                  <div className="col-12 text-center d-flex">
                    <div className="w-100 align-self-center">
                      <i className="fa fa-frown-o h1 font-weight-normal"></i>
                      <p className="font-weight-bold">O seu carrinho está vazio </p>
                      <p className="mb-adapt-3">Veja as sugestões que temos para si na nossa loja!</p>
                      <button className="btn btn-dark font-weight-bold pl-5 pr-5" onClick={closeCartHandle}>
                        Continuar a Compra
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shoppingCart } = state;
  const { cart } = shoppingCart;

  return {
    //cart
    loadingShoppingCart: shoppingCart.loadingShoppingCart,
    loadingAddProductToCart: shoppingCart.loadingAddProductToCart,
    requestErrors: shoppingCart.error,
    addedProductId: shoppingCart.addProductId,
    addedVariationId: shoppingCart.addVariationId,
    couponHasErrors:
      shoppingCart.cart &&
      shoppingCart.cart.coupon &&
      ((shoppingCart.couponError && shoppingCart.couponError.length > 0) ||
        shoppingCart.cart.totalSpentCoupons < shoppingCart.cart.coupon.minSpent ||
        shoppingCart.cart.totalSpentCoupons > shoppingCart.cart.coupon.maxSpent),
    loadingApplyCouponToCart: shoppingCart.loadingApplyCouponToCart,
    products:
      cart && cart.shoppingCartProductDetails
        ? cart.shoppingCartProductDetails.filter((item) => !item.shoppingCartProductVehicleDetail)
        : [],
    hasPendentProducts:
      cart && cart.shoppingCartProductPendentDetails && cart.shoppingCartProductPendentDetails.length > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productId, variationId, quantity, productName, variationName, categoryName, price) => {
      dispatch(
        shoppingCartActions.addProductToCart(
          productId,
          variationId,
          quantity,
          false,
          productName,
          variationName,
          categoryName,
          price
        )
      );
    },
    removeFromCart: (productId, variationId) => {
      dispatch(shoppingCartActions.removeProductFromCart(productId, variationId));
    },
    acceptRejectPendentProduct: (productId, variationId, isToAccept) => {
      dispatch(shoppingCartActions.acceptRejectPendentProduct(productId, variationId, isToAccept));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
