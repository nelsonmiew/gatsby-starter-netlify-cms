import React, { Component } from "react";
import { Link } from "gatsby";
import config from "src/services/config";
import { EuroFormat2Decimals } from "../Helpers/valuesFormatters";
import ImageProduct from "./ImageProduct";

export class CardProduct extends Component {
  constructor(props) {
    super(props);
    this.cardImageRef = React.createRef();
  }

  componentDidMount() {
    // if (this.props.observer) {
    //   this.props.observer.observe();
    // }
  }

  componentDidUpdate(prevProps) {
    // const { imageUrl } = this.props;

    // if (prevProps.imageUrl !== imageUrl && this.cardImageRef.current) {
    //   this.cardImageRef.current.setAttribute("data-loaded", false);

    //   if (this.props.observer) {
    //     this.props.observer.observe();
    //   }
    // }
  }

  toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { addFavorite, removeFavorite, productId, isFavourite } = this.props;

    if (productId) {
      if (!isFavourite) {
        addFavorite(productId);
      } else {
        removeFavorite(productId);
      }
    }
  };

  clickProduct = (e) => {
    const { productId, name, price, categoryPath, googleProductClick } = this.props;

    googleProductClick({
      item_id: productId,
      item_name: name,
      item_category: (categoryPath && categoryPath[categoryPath.length - 1].name) || 'Root',
      price: price,
    });
  };

  render() {
    const {
      slug,
      name,
      imageUrl,
      price,
      priceOriginal,
      discount,
      isDiscountPercentage,
      mainCategory,
      category,
      categoryPath,
      isFavourite,
      isFeatured,
      hasStock,
      className
    } = this.props;
    
    const api = config.apiUrl.substring(0, config.apiUrl.length - 1);
    const imageExt = imageUrl ? imageUrl.substring(imageUrl.lastIndexOf("."), imageUrl.length) : "";
    const productIMG = imageUrl ? api + imageUrl.replace(imageExt, ".thumb" + imageExt) : "";

    return (
      <Link
        to={"/" + (mainCategory? mainCategory.slugSimple + "/": "") + slug}
        className={"card card-product overflow-hidden " + (className ? className : "")}
        state={{ category: category, categoryPath: categoryPath }}
        onClick={this.clickProduct}
      >
        <figure className="d-flex flex-column h-100">
          <picture>
            <ImageProduct
              slug={(mainCategory? mainCategory.slugSimple + "/": "") + slug}
              altImage={name}
              originalSrc={productIMG}
              aspectRatioW={1024}
              aspectRatioH={664}
              imageRef={this.cardImageRef}
              // fadeIn={false}
            />
            <span
              onClick={this.toggleFavourite}
              className={
                "d-block card-favorite fa " + (isFavourite ? "fa-heart text-danger" : "fa-heart-o text-light-grey")
              }
            ></span>
            {(priceOriginal > price && discount) ? (
              <span className="product-label bg-dark text-white">{"-" + (isDiscountPercentage ? (Math.round((discount || 0) * 100) + "%") : EuroFormat2Decimals(discount))}</span>
            ) : (
              isFeatured && <span className="product-label bg-primary text-white">Novo</span>
            )}
          </picture>
          <figcaption className="d-flex flex-fill">
            <div className="flex-fill p-adapt-2">
              <p className="listing_small text-muted text-uppercase mb-1">
                <span className="font-weight-bold small">
                  {mainCategory? mainCategory.name: ""}
                </span>
              </p>
              <h3 className="font-weight-bold listing_text">{name}</h3>
              <div className="d-block mt-1">
                {priceOriginal > price && (
                  <span className="text-muted old-price mr-2">{EuroFormat2Decimals(priceOriginal)}</span>
                )}
                <span className="price_span listing_text">{EuroFormat2Decimals(price)}</span>
                {!hasStock && <span className="listing_text text-muted ml-2">Sem Stock</span>}
              </div>
            </div>
          </figcaption>
        </figure>
      </Link>
    );
  }
}
export default CardProduct;


