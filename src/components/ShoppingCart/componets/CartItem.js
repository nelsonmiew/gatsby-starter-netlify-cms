import React, { Component } from "react";
import { Link } from "gatsby";
// import config from "src/services/config";
import { config } from "../GlobalConstants";

import { EuroFormat2Decimals } from "src/components/Helpers/valuesFormatters";
import ImageProduct from "src/components/Product/components/ImageProduct";

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.cartImageRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.observer) {
      this.props.observer.observe();
    }
  }

  componentDidUpdate(prevProps) {
    const { item } = this.props;

    if (prevProps.item.imageProductUrl !== item.imageProductUrl && this.cartImageRef.current) {
      this.cartImageRef.current.setAttribute("data-loaded", false);

      if (this.props.observer) {
        this.props.observer.observe();
      }
    }
  }

  render() {
    const {
      item,
      changeQuantityHandle,
      removeItemHandle,
      acceptRejectPendentItem,
      loadingAddProductToCart,
      addedProductId,
      addedVariationId,
      requestErrors,
      viewMode,
      isPendent,
      couponHasErrors,
    } = this.props;

    const api = config.apiUrl.substring(0, config.apiUrl.length - 1);
    const imageExt = item.imageProductUrl
      ? item.imageProductUrl.substring(item.imageProductUrl.lastIndexOf("."), item.imageProductUrl.length)
      : "";
    const productIMG = item.imageProductUrl ? api + item.imageProductUrl.replace(imageExt, ".thumb" + imageExt) : "";

    return (
      <div className={"cart-item"}>
        <div className="d-flex">
          <Link
            to={"/" + item.mainCategorySlug + "/" + item.slug}
            state={{ isToCloseCart: true }}
            className={"mr-adapt-3 flex-shrink-0" + (viewMode ? " pointer-events-none" : "")}
            style={{ width: "100px", maxWidth: "100px" }}
          >
            <picture>
              <ImageProduct
                slug={item.mainCategorySlug + "/" + item.slug}
                altImage={item.name}
                originalSrc={productIMG}
                aspectRatioW={100}
                aspectRatioH={100}
                objectFit={"cover"}
                imageRef={this.cardImageRef}
              />
              {item.priceOriginal > item.price && (
                <span className="product-label bg-dark text-white">
                  {"-" +
                    (item.isDiscountPercentage
                      ? Math.round((item.discount || 0) * 100) + "%"
                      : EuroFormat2Decimals(item.discount))}
                </span>
              )}
            </picture>
          </Link>
          <div className="d-flex flex-column flex-fill justify-content-between ">
            <div className="d-flex justify-content-between">
              <Link
                to={"/" + item.mainCategorySlug + "/" + item.slug}
                state={{ isToCloseCart: true }}
                className={"text-dark" + (viewMode ? " pointer-events-none" : "")}
              >
                <p className="listing_text font-weight-bold text-dark">{item.name}</p>
                {item.variationId && <p className="listing_text mt-0 mb-auto text-dark">{item.variationName}</p>}
                {viewMode && <p className="listing_small text-dark">Quantidade: {item.quantity}</p>}
              </Link>
              <div>
                {item.priceOriginal > item.price && (
                  <p className="text-right text-muted old-price">
                    {EuroFormat2Decimals(item.priceOriginal * item.quantity)}
                  </p>
                )}
                <p className="listing_text text-right">{EuroFormat2Decimals(item.price * item.quantity)}</p>
                {item.isValidForCoupon && (
                  <span
                    className={
                      "listing_small pt-1 pb-1 border-0 h-auto form-control" + (couponHasErrors ? " is-invalid" : "")
                    }
                    style={{ backgroundColor: "#b5ffa6" }}
                  >
                    Cupão
                  </span>
                )}
                {isPendent && <span className="listing_small alert-warning p-1">Sugestão</span>}
              </div>
            </div>
            {isPendent && (
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-sm btn-primary mr-2"
                  onClick={(e) => acceptRejectPendentItem(item.id, item.variationId, true)}
                >
                  Aceitar
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={(e) => acceptRejectPendentItem(item.id, item.variationId, false)}
                >
                  Descartar
                </button>
              </div>
            )}
            {!viewMode && (
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <label className="mb-0 listing_small small d-block" htmlFor={"qtd-" + item.id}>
                    Qtd:
                  </label>
                  <select
                    id={"qtd-" + item.id}
                    onChange={(e) =>
                      changeQuantityHandle(
                        item.id,
                        item.variationId,
                        e.target.value,
                        item.name,
                        item.variationName,
                        item.category,
                        item.price
                      )
                    }
                    value={item.stockAvailable > 0 ? item.quantity : 0}
                    className="custom-select border mb-0"
                    style={{ width: "100px" }}
                    disabled={loadingAddProductToCart || item.stockAvailable === 0}
                  >
                    {item.stockAvailable !== 0 &&
                      [...Array(10)].map((arr, k) => (
                        <option key={"op-qty-" + k} value={k + 1} disabled={k + 1 > item.stockAvailable}>
                          {k + 1}
                        </option>
                      ))}
                  </select>
                </div>
                {requestErrors &&
                  requestErrors[0].maxQuantity &&
                  addedProductId === item.id &&
                  (!item.variationId || addedVariationId === item.variationId) && (
                    <p className="listing_small text-danger font-weight-bold">
                      {"Apenas " + requestErrors[0].maxQuantity + " em stock"}
                    </p>
                  )}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    removeItemHandle(item.id, item.variationId);
                  }}
                  className="listing_small text-underline"
                >
                  Remover
                </a>
              </div>
            )}
            {item.stockAvailable < item.quantity && (
              <p className="listing_small text-danger font-weight-bold mt-2">
                {item.stockAvailable > 0 ? (
                  <>
                    {"Apenas " + item.stockAvailable + " em stock, deseja mudar a quantidade? "}
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        changeQuantityHandle(
                          item.id,
                          item.variationId,
                          item.stockAvailable,
                          item.name,
                          item.variationName,
                          item.category,
                          item.price
                        );
                      }}
                      className="text-underline"
                    >
                      Alterar
                    </a>
                  </>
                ) : (
                  <>{"Este produto já não tem stock disponível."}</>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
