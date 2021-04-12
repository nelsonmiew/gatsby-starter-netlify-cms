import React, { Component, Fragment } from "react";
import { Link, navigate } from "gatsby";
import { STORE_PATH } from "./GlobalConstants";

import { EuroFormat2Decimals } from "./Helpers/valuesFormatters";

export class LayoutStore extends Component {
  constructor(props) {
    super(props);

    this.closeCart = this.closeCart.bind(this);
    this.openCart = this.openCart.bind(this);

    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);

    this.menuTimeout = null;
  }

  componentDidMount() {
    const { isToCloseCart } = this.props;

    if (isToCloseCart) this.closeCart();

    // const _ = this;
    // const panContainer = document.querySelector(".cart-container");
    // if (window !== undefined) {
    //   const Hammer = require("hammerjs");
    //   const hammertime = new Hammer(panContainer);
    //   hammertime.on("panright", function (ev) {
    //     if (ev.type === "panright" && _.props.shoppingCartOpen) {
    //       _.closeCart();
    //     }
    //   });
    // }

    const { isToOpenShoppingCart, shoppingCartOpen, toggleShoppingCart } = this.props;

    if (isToOpenShoppingCart && !shoppingCartOpen) {
      navigate("/loja/", { state: { isToOpenShoppingCart: false } });
      toggleShoppingCart();
    }
  }

  componentDidUpdate(prevProps) {
    const { loadingAddProductToCart, shoppingCartOpen, requestErrors } = this.props;

    if (prevProps.loadingAddProductToCart && !loadingAddProductToCart && !requestErrors) {
      this.openCart();
    }

    if (prevProps.shoppingCartOpen !== shoppingCartOpen) {
      if (shoppingCartOpen) {
        if (document.body) document.body.classList.add("overHidden-cart");
      } else {
        if (document.body) document.body.classList.remove("overHidden-cart");
      }
    }
  }

  closeCart(e) {
    if (e) e.preventDefault();

    const { shoppingCartOpen, toggleShoppingCart } = this.props;

    if (shoppingCartOpen) {
      toggleShoppingCart();
    }
  }

  openCart(e) {
    if (e) e.preventDefault();

    const { shoppingCartOpen, toggleShoppingCart } = this.props;

    if (!shoppingCartOpen) {
      toggleShoppingCart();
    }
  }

  goBack(historyBack, e) {
    if (e) e.preventDefault();

    if (!historyBack) {
      navigate(STORE_PATH);
    } else {
      window.history.back();
    }
  }

  openMenu(e) {
    const newMenu = e.currentTarget;
    const activeMenu = document.querySelector(".store-nav .level-0 .menu-opened");

    if (activeMenu && activeMenu === newMenu) {
      clearTimeout(this.menuTimeout);
    } else {
      if (activeMenu) activeMenu.classList.remove("menu-opened");
      newMenu.classList.add("menu-opened");
    }
  }
  closeMenu() {
    const activeMenu = document.querySelector(".store-nav .level-0 .menu-opened");
    if (activeMenu) {
      this.menuTimeout = setTimeout(() => {
        activeMenu.classList.remove("menu-opened");
      }, 650);
    }
  }

  render() {
    const {
      children,
      observer,
      showGoBack,
      menu,
      category,
      categoryPath,
      shoppingCartOpen,
      freeDeliveryChargesActive,
      percentageToDeliveryCharges,
      remainingForFreeDeliveryCharges,
    } = this.props;

    const categoryNav = (categories, level) => {
      if (!categories || categories.length === 0 || level > 1) return <></>;
      return (
        <ul className={"list-unstyled level-" + (level || 0)}>
          {categories.map((cat) => (
            <li
              key={"menu-l-" + cat.id}
              onMouseEnter={level === 0 || !level ? this.openMenu : undefined}
              onMouseLeave={level === 0 || !level ? this.closeMenu : undefined}
              className={
                (category && category.id === cat.id) || (categoryPath && categoryPath.some((c) => c.slug === cat.slug))
                  ? "active"
                  : ""
              }
            >
              <Link to={STORE_PATH + cat.slug + "/"}>{cat.name}</Link>
              {categoryNav(cat.categories, cat.level)}
            </li>
          ))}
        </ul>
      );
    };

    return (
      <>
        <div className="app-header store-header">
          <div className="header-bar bg-dark">
            <div className="container pt-0 pb-0 h-100 border-0">
              <div className="row h-100 align-items-center">
                <div className="h-100 col-12 col-lg-8 offset-lg-2">
                  <nav className="store-nav d-flex m-auto h-100">{categoryNav(menu)}</nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout">
          <div className="container">
            <div className="row">
              <div className="col-12 listing_small d-flex mb-1 mt-3">
                {showGoBack && (
                  <a
                    href="/"
                    onClick={this.goBack.bind(this, !!categoryPath)}
                    className="font-weight-bold mr-4 flex-shrink-0"
                  >
                    <i className="fa fa-arrow-left mr-2"></i>Voltar
                  </a>
                )}
                <div>
                  <Link to={STORE_PATH} className="d-inline-block mb-1">
                    Todos os produtos
                  </Link>
                  {categoryPath &&
                    categoryPath.map((cat, i) => (
                      <Fragment key={"breadcrumb-link-" + i}>
                        {" / "}
                        <Link to={STORE_PATH + cat.slug + "/"} className="d-inline-block mb-1">
                          {cat.name}
                        </Link>
                      </Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="d-table h-100">
            {React.Children.map(children, (child) => React.cloneElement(child, { observer }))}
          </div>
        </div>
        <div className={"cart-container " + (shoppingCartOpen ? "open" : "")}>
          {shoppingCartOpen && (
            <button className="cart-overlay-button" onClick={this.closeCart}>
              <div className="cart-overlay"></div>
            </button>
          )}
          <div className="cart shadow-lg">
            <div className="d-flex flex-column h-100 justify-content-between">
              <div className="cart-head pr-3 pl-3">
                <a
                  href="/"
                  className="d-block listing_text text-dark pt-2 pb-2 d-flex align-items-center"
                  onClick={this.closeCart}
                >
                  <i className="fa fa-angle-right h3"></i>
                  <span className="text-muted pl-2">Voltar</span>
                  <span className="font-weight-bold text-dark mr-0 ml-auto">O meu carrinho</span>
                </a>
              </div>
              {freeDeliveryChargesActive && remainingForFreeDeliveryCharges > 0 && (
                <div className="row shipping-progress">
                  <div className="col-12">
                    <div className="m-3">
                      <p className="listing_small text-center mb-2">
                        Está a <strong>{EuroFormat2Decimals(remainingForFreeDeliveryCharges)}</strong> de PORTES GRÁTIS
                      </p>
                      <div className="progress" style={{ height: "10px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: percentageToDeliveryCharges + "%" }}
                          aria-valuenow={percentageToDeliveryCharges}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default LayoutStore;
// const mapStateToProps = (state) => {
//   const { shoppingCart } = state;

//   return {
//     loadingAddProductToCart: shoppingCart.loadingAddProductToCart,
//     addProductSuccess: shoppingCart.addProductSuccess,
//     shoppingCartOpen: shoppingCart.shoppingCartOpen,
//     percentageToDeliveryCharges:
//       shoppingCart.cart &&
//       (shoppingCart.cart.priceWithoutDeliveryCharges * 100) / shoppingCart.cart.orderValueFreeDeliveryCharges,
//     freeDeliveryChargesActive: shoppingCart.cart && shoppingCart.cart.orderFreeDeliveryChargesActive,
//     remainingForFreeDeliveryCharges:
//       shoppingCart.cart && shoppingCart.cart.deliveryCharges !== 0
//         ? shoppingCart.cart.orderValueFreeDeliveryCharges - shoppingCart.cart.priceWithoutDeliveryCharges
//         : 0,
//     requestErrors: shoppingCart.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleShoppingCart: () => dispatch(shoppingCartActions.toggleShoppingCart()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LayoutStore);
