import React, { Component } from "react";
import { connect } from "react-redux";
import loadable from "@loadable/component";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { ButtonGroup } from "reactstrap";
// import shoppingCartActions from "src/redux/reducers/shoppingCart/shoppingCart.actions";
// import userActions from "src/redux/reducers/account/account.actions";
import { EuroFormat2Decimals } from "../Helpers/valuesFormatters";
import { GatsbyImage } from "gatsby-plugin-image";
import rehypeReact from "rehype-react";
import NotifyMeWhenAvailable from "./components/NotifyMeWhenAvailable";


const ProductGallery = loadable(() => import("./components/ProductGallery"));

export class index extends Component {
  constructor(props) {
    super(props);
    this.productVariationsRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.observer) {
      this.props.observer.observe();
    }
  }

  componentDidUpdate(prevProps) {
    const { hasVariations, currentVariation } = this.props;

    if (hasVariations && prevProps.currentVariation !== currentVariation) {
    }
  }

  addToCart = () => {
    const { product, hasVariations, currentVariation, addToCart } = this.props;

    if (hasVariations) {
      if (currentVariation) {
        addToCart(
          product.id,
          currentVariation.id,
          1,
          product.name,
          currentVariation.name,
          product.categoryPath &&
            product.categoryPath.length > 0 &&
            product.categoryPath[product.categoryPath.length - 1].name,
          product.price
        );
      } else {
        //scroll top
        window.scrollTo(0, parseInt(this.productVariationsRef.current.offsetTop));
        this.productVariationsRef.current.classList.add("invalid-feedback");
      }
    } else {
      addToCart(
        product.id,
        null,
        1,
        product.name,
        "",
        product.categoryPath &&
          product.categoryPath.length > 0 &&
          product.categoryPath[product.categoryPath.length - 1].name,
        product.price
      );
    }
  };

  clearFeedback = () => {
    this.productVariationsRef.current.classList.remove("invalid-feedback");
  };

  toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { addFavorite, removeFavorite, product, isFavourite } = this.props;

    if (product.id) {
      if (!isFavourite) {
        addFavorite(product.id);
      } else {
        removeFavorite(product.id);
      }
    }
  };

  render() {
    const {
      product,
      isFavourite,
      loadingAddProductToCart,
      hasVariations,
      currentVariation,
      currentVariationImages,
      imagesProduct,
      requestErrors,
      addedProductId,
      productDescription,
      imagesDescription,
    } = this.props;

    const { attributesVariable } = product;

    const renderAst = new rehypeReact({
      Fragment: React.Fragment,
      createElement: React.createElement,
      components: {
        img: ({ src }) => {
          const imgFluid =
            imagesDescription && imagesDescription.find((img) => img.name === src.match(/([^/]+)(?=\.\w+$)/)[0]);
            console.log("imgFluid", imagesDescription);
          if (!imgFluid) return <img srcSet={src} alt={product.name} />;
          return <GatsbyImage image={imgFluid.childImageSharp.gatsbyImageData} alt={product.name} />;
        },
      },
    }).Compiler;

    
    const productGallery =
      imagesProduct && imagesProduct.length > 0 ? (
        <ProductGallery
          images={imagesProduct.filter((img) =>
            !hasVariations || !currentVariationImages || currentVariationImages.length === 0
              ? true
              : currentVariationImages.includes(img.name)
          )}

          altText={product.name}
          fallback={
            <div className="d-block">            
               {/* <GatsbyImage
                 image={{ ...imagesProduct[0].childImageSharp.gatsbyImageData }}
                imgStyle={{ objectFit: "contain" }}
                alt={product.name}                
              />   */}
            </div>
          }
        />
      ) : (
        <></>
      );

    const productLabel = (
      <>
        {(!hasVariations && product.priceOriginal > product.price) ||
        (hasVariations && currentVariation && currentVariation.priceOriginal > currentVariation.price) ? (
          <span className="product-label bg-dark text-white">
            {"-" +
              (product.isDiscountPercentage
                ? Math.round(((hasVariations ? currentVariation.discount : product.discount) || 0) * 100) + "%"
                : EuroFormat2Decimals(hasVariations ? currentVariation.discount : product.discount))}
          </span>
        ) : (
          product.isFeatured && <span className="product-label bg-primary text-white">Novo</span>
        )}
      </>
    );
         
    return (
      <div className="page-content pb-adapt-7 product-page">
        <div className="container">
          <div className="row mt-1">
            <div className="d-none d-lg-block col-lg-8 flex-wrap order-1 order-lg-0">
              {productGallery}
              {productLabel}
            </div>
            <div className="col-12 col-lg-4 order-0 order-lg-1">
              <h3 className="listing_small text-muted text-uppercase mb-1">
                <span className="font-weight-bold small">{product.mainCategory.name}</span>
              </h3>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="h2 font-weight-bold">{product.name}</h1>
                <a
                  href="/"
                  className={"listing_subtitle text-muted ml-3"}
                  alt="Adicionar aos favoritos"
                  title="Adicionar aos favoritos"
                  onClick={this.toggleFavourite}
                >
                  <i className={isFavourite ? "fa fa-heart text-danger" : "fa fa-heart-o"}></i>
                </a>
              </div>
              <div className="d-block">
                {((!hasVariations && product.priceOriginal > product.price) ||
                  (hasVariations && currentVariation && currentVariation.priceOriginal > currentVariation.price)) && (
                  <span className="old-price text-muted mr-2">
                    {EuroFormat2Decimals(hasVariations ? currentVariation.priceOriginal : product.priceOriginal)}
                  </span>
                )}
                <span className="font-weight-bold">
                  {hasVariations && currentVariation
                    ? EuroFormat2Decimals(currentVariation.price)
                    : EuroFormat2Decimals(product.price)}
                </span>
              </div>
              <p className="d-none d-lg-block mt-adapt-4 listing_text">{product.description}</p>
              <div className="row d-block d-lg-none mt-adapt-4 position-relative product-gallery">
                {productGallery}
                {productLabel}
              </div>
              {product.hasStock &&
                (!requestErrors ||
                  (requestErrors && requestErrors[0].maxQuantity === 0 && addedProductId !== product.id)) && (
                  <>
                    {hasVariations && (
                      <div className="product-variations d-block mt-adapt-4" ref={this.productVariationsRef}>
                        {attributesVariable &&
                          attributesVariable.map((at, i) => (
                            <div key={"attr-variable-" + i} className="mb-adapt-3">
                              <h4 className="h5 font-weight-bold mb-2">{"Selecionar " + at.name}</h4>
                              <ButtonGroup>
                                {at.attributesValue &&
                                  at.attributesValue.map((atv, j) => (
                                    <Field
                                      key={"p_variation-" + i + "-" + j}
                                      name={"p_variation[" + product.id + "][" + i + "]"}
                                      value={atv.id}
                                      valueToSet={atv.id}
                                      component={({ valueToSet, input }) => (
                                        <button
                                          key={"attr-variable-value-" + atv.id}
                                          type="button"
                                          className={
                                            "btn btn-outline-dark listing_text " +
                                            (input.value === valueToSet ? "active" : "")
                                          }
                                          alt={atv.name}
                                          title={atv.name}
                                          onClick={() => {
                                            this.clearFeedback();
                                            input.onChange(valueToSet);
                                          }}
                                        >
                                          {atv.name}
                                        </button>
                                      )}
                                    />
                                  ))}
                              </ButtonGroup>
                            </div>
                          ))}
                      </div>
                    )}
                    {(!hasVariations ||
                      !currentVariation ||
                      (hasVariations && currentVariation && currentVariation.stock > 0)) && (
                      <>
                        {hasVariations && currentVariation && currentVariation.stock < 6 && (
                          <p className="listing_text font-weight-bold text-danger mb-2">Pouco stock</p>
                        )}
                        <button
                          type="button"
                          className={
                            "btn btn-primary font-weight-bold pt-2 pb-2 pl-5 pr-5 mt-2 mb-4 mt-lg-4 w-100 w-lg-auto"
                          }
                          onClick={this.addToCart}
                          disabled={loadingAddProductToCart}
                        >
                          {hasVariations && !currentVariation ? "Selecione um tamanho" : "Adicionar ao carrinho"}
                        </button>
                      </>
                    )}
                  </>
                )}
              {(!product.hasStock ||
                (hasVariations && currentVariation && currentVariation.stock === 0) ||
                (requestErrors && requestErrors[0].maxQuantity === 0 && addedProductId === product.id)) && (
                <div className="mt-3">
                  <p className="text-danger">Sem Stock</p>
                  <NotifyMeWhenAvailable
                    productId={product.id}
                    variationId={hasVariations && currentVariation && currentVariation.id}
                  />
                </div>
              )}
            </div>
            {product.descriptionDetail && (
              <div className="col-12 col-lg-8 mb-3 mt-3 order-1 product-description">
                <h2 className="h4 font-weight-bold mb-2">Descrição</h2>
                <div className="w-100 h-100 overflow-hidden">{renderAst(productDescription)}</div>
              </div>
            )}
            {product.attributes.length > 0 && (
              <div className="col-12 col-lg-8 order-1">
                <hr />
                <div className="product-attributes">
                  <h2 className="h4 font-weight-bold mb-4">Detalhe</h2>
                  {product.attributes &&
                    product.attributes.map(
                      (attr, i) =>
                        attr.attributesValue && (
                          <div key={"vattr-" + i} className="d-inline-block align-top w-100 w-lg-50 mb-adapt-3">
                            <span className="d-block listing_text font-weight-bold">{attr.name + " "}</span>
                            {attr.attributesValue.map((attrValue, k) => (
                              <span key={"vattr-value-" + i + "-" + k} className="listing_text">
                                {(k > 0 ? ", " : "") + attrValue.name}
                              </span>
                            ))}
                          </div>
                        )
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const FORM_NAME = "product";
const selector = formValueSelector(FORM_NAME);

index = reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(index);

const mapStateToProps = (state, props) => {
  const { shoppingCart, account } = state;
  const { product } = props;
  const { variations } = product;

  const p_variation = selector(state, "p_variation");

  //set default variation
  // const defaultVariation = null;

  // let defaultProductVariation = {};
  // if (defaultVariation && defaultVariation.attributeValueIds) {
  //   defaultProductVariation[product.id] = {};

  //   defaultVariation.attributeValueIds.forEach((atv, i) => {
  //     defaultProductVariation[product.id][i] = atv;
  //   });
  // }

  //find current variation
  let currentVariation;
  let currentVariationImages;
  if (variations && p_variation && p_variation[product.id]) {
    const currentVariationValueIds = Object.keys(p_variation[product.id]).map((k) => p_variation[product.id][k]);

    currentVariation = variations.find((v) =>
      v.attributeValueIds.every((atv) => currentVariationValueIds.includes(atv))
    );

    currentVariationImages =
      product &&
      product.images
        .filter((img) => img.attributeValueIds.some((atv) => currentVariationValueIds.includes(atv)))
        .map((img) => img.id);
  }

  return {
    isFavourite: true, //account.favoritesIds && account.favoritesIds.indexOf(product.id) >= 0,
    //cart
    loadingAddProductToCart:false,// shoppingCart.loadingAddProductToCart,
    addProductSuccess: false, //shoppingCart.addProductSuccess,
    addedProductId: false, //shoppingCart.addProductId,
    requestErrors: false, //shoppingCart.error,
    //form
    hasVariations:false, // product.variations.length > 0,
    currentVariation,
    currentVariationImages,
    initialValues: {
      p_variation: null,
      ac_contactType: "email",
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doChange: (y, z) => dispatch(change(FORM_NAME, y, z)),
    addToCart: (id, quantity, userId, productName, variationName, categoryName, price) => {
      return true;
      // dispatch(
      //   shoppingCartActions.addProductToCart(
      //     id,
      //     quantity,
      //     userId,
      //     true,
      //     productName,
      //     variationName,
      //     categoryName,
      //     price
      //   )
      // );
    },
    addFavorite: (id) => true, //dispatch(userActions.addFavorite(id)),
    removeFavorite: (id) => true //dispatch(userActions.removeFavorite(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
