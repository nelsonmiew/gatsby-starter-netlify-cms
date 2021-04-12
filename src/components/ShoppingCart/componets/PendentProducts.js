import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import CartItem from "./CartItem";

export class PendentProducts extends Component {
  render() {
    const { pendentProducts, loadingAddProductToCart, acceptRejectPendentItem } = this.props;

    const settings = {
      dots: true,
      arrows: false,
      infinite: false,
      lazyLoad: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
    };

    return (
      <div className="row bg-light-grey">
        <div className="col-12">
          <div className="row m-2">
            <div className="col-12">
              <Slider {...settings} ref={(slider) => (this.slider = slider)} className="">
                {pendentProducts &&
                  pendentProducts.map((item, i) => (
                    <div className="card mb-2" key={"pending-item-" + i}>
                      <div className="card-head pl-3 pr-3 pt-2 pb-2 border-bottom">
                        <p className="listing_text">
                          <span role="img" aria-label="sugestão">
                            👋
                          </span>{" "}
                          O consultor do seu carrinho aconselha:
                        </p>
                      </div>
                      <div className="card-body p-3">
                        <CartItem
                          key={"cart-item-pendent-" + i}
                          item={item}
                          loadingAddProductToCart={loadingAddProductToCart}
                          viewMode={true}
                          isPendent={true}
                          acceptRejectPendentItem={acceptRejectPendentItem}
                          observer={this.props.observer}
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
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
    loadingAddProductToCart: shoppingCart.loadingAddProductToCart,
    pendentProducts: cart && cart.shoppingCartProductPendentDetails,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PendentProducts);
