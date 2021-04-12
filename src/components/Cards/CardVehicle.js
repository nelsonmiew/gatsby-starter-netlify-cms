import React, { Component } from "react";
import loadable from "@loadable/component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "gatsby";
import { ImgPlaceholder } from "components/GlobalComponents";
import { config } from "services/config";
import userActions from "src/redux/reducers/account/account.actions";
import {
  defaultCardImg,
  FINANCE_MODES,
  VEHICLE_LABELS,
  FIND_VEHICLE_BASE_PATH,
  FIND_VEHICLE_VEHICLE_PATH,
  VEHICLE_PATH,
} from "components/GlobalConstants";

import {
  EuroFormat,
  EngineTypeFormat,
  KmFormat,
  DisplacementFormat,
  TaxFormat2Decimals,
  EuroFormat2Decimals,
} from "../Helpers/valuesFormatters";
import googleActions from "src/redux/reducers/google/google.actions";
import FlashSaleCountdown from "../DetailsComponents/FlashSaleCountdown";

const ModalCardVehicle = loadable(() => import("../Modals/ModalCardVehicle"));
const ModalCardVehicleFlashSales = loadable(() => import("../Modals/ModalCardVehicleFlashSales"));
const LabelCountdown = loadable(() => import("components/DetailsComponents/LabelCountdown"));
const ModalCardCorporateProduct = loadable(() => import("../Modals/ModalCardCorporateProduct"));
const ModalCardCorporateApresentation = loadable(() => import("../Modals/ModalCardCorporateApresentation"));

// import ModalCardVehicle from "../Modals/ModalCardVehicle";
// import LabelCountdown from "components/DetailsComponents/LabelCountdown";

export class CardVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalInfo: false,
      showModalFlashSales: false,
      showModalCorporateProduct: false,
      showModalCorporateApresentation: false,
    };

    this.cardImageRef = React.createRef();
    this.toggleModalInfo = this.toggleModalInfo.bind(this);
    this.toggleModalFlashSales = this.toggleModalFlashSales.bind(this);
    this.toggleModalCorporateProduct = this.toggleModalCorporateProduct.bind(this);
    this.toggleModalCorporateApresentation = this.toggleModalCorporateApresentation.bind(this);
  }

  componentDidMount() {
    if (this.props.observer) {
      this.props.observer.observe();
    }
  }

  componentDidUpdate(prevProps) {
    const { imageUrl } = this.props;

    if (prevProps.imageUrl !== imageUrl && this.cardImageRef.current) {
      this.cardImageRef.current.setAttribute("data-loaded", false);
    }
  }

  toggleModalInfo = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      showModalInfo: !this.state.showModalInfo,
    });
  };

  toggleModalFlashSales = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      showModalFlashSales: !this.state.showModalFlashSales,
    });
  };

  toggleModalCorporateProduct = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      showModalCorporateProduct: !this.state.showModalCorporateProduct,
    });
  };

  toggleModalCorporateApresentation = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      showModalCorporateApresentation: !this.state.showModalCorporateApresentation,
    });
  };

  toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { addFavorite, removeFavorite, vehicleId, isFavourite } = this.props;

    if (vehicleId) {
      if (!isFavourite) {
        addFavorite(vehicleId);
      } else {
        removeFavorite(vehicleId);
      }
    }
  };

  clickProduct = (e) => {
    const { vehicleId, name, brandName, price, googleProductClick } = this.props;

    googleProductClick({
      item_id: vehicleId,
      item_name: name,
      item_brand: brandName,
      item_category: "Vehicle",
      price: price,
    });
  };

  render() {
    const {
      className,
      vehicleId,
      findVehicle,
      isFavourite,
      slug,
      name,
      headline,
      brandName,
      segmentName,
      engine,
      displacement,
      powerHp,
      year,
      numberOfDoors,
      numberMonths,
      kilometers,
      price,
      priceOriginal,
      imageUrl,
      isQuotationCard,
      showFavoriteButton,
      financeTypeId,
      initialDeposit,
      recoveryValue,
      annualMileage,
      isFlashSale,
      flashSaleValue,
      flashSaleEndDate,
      financeTypes,
      financialMode,
      taeg,
      mtc,
      mtic,
      tan,
      onClick,
      reservationEndDate,
      isLoan,
      isCorporate,
      isCorporateApresentation,
      isCorporateProduct,
      isSold,
      isNew,
      isReserved,
      inCampaign,
      vehicleLabel,
      isSpecialCampaign,
    } = this.props;

    const {
      showModalInfo,
      showModalFlashSales,
      showModalCorporateProduct,
      showModalCorporateApresentation,
    } = this.state;

    const api = config.apiUrl.substring(0, config.apiUrl.length - 1);
    const financeType = financeTypes ? financeTypes.find((f) => f.value === financeTypeId) : "";
    const imageExt = imageUrl ? imageUrl.substring(imageUrl.lastIndexOf("."), imageUrl.length) : "";
    const vehicleIMG = imageUrl ? api + imageUrl.replace(imageExt, ".thumb" + imageExt) : defaultCardImg;

    let label = (
      <div className={"vehicle-label " + vehicleLabel.class}>
        <i className="fa fa-star"></i>
        {vehicleLabel.label}
      </div>
    );

    return vehicleId ? (
      <Link
        to={
          (findVehicle ? FIND_VEHICLE_BASE_PATH + FIND_VEHICLE_VEHICLE_PATH : VEHICLE_PATH) +
          (isNew ? "novos/" : "usados/") +
          slug +
          "/" +
          vehicleId +
          "/?initialDeposit=" +
          (initialDeposit || 0) +
          "&financeMode=" +
          (financialMode || FINANCE_MODES[0].value) +
          "&financeTypeId=" +
          financeTypeId +
          "&numberOfMonths=" +
          numberMonths +
          "&annualMileage=" +
          (annualMileage || "") +
          "&recoveryValue=" +
          (recoveryValue || "")
        }
        className={
          "d-block card-vehicle overflow-hidden border-0 " +
          (className ? className : "") +
          (isReserved ? " is-reserved" : isSold ? " is-sold" : "") +
          (isCorporate ? " is-corporate" : "") +
          (isCorporateProduct ? " is-corporate-product" : "") +
          (isCorporateApresentation ? " is-corporate-apresentation" : "")
        }
        onClick={this.clickProduct}
      >
        {headline && (
          <div className="bg-clear-blue pl-adapt-2 pt-adapt-1 pr-adapt-2 pb-adapt-1 position-relative">{headline}</div>
        )}
        <figure onClick={onClick} className="d-flex flex-column h-100">
          <picture className="">
            <ImgPlaceholder width={265} height={165} />
            <span
              ref={this.cardImageRef}
              role="img"
              aria-label={name + " " + year + " " + EngineTypeFormat(engine)}
              className="has_bg lazy-media"
              data-background-image={vehicleIMG}
              //style={{ backgroundImage: "url(" + vehicleIMG + ")" }}
            ></span>
            {showFavoriteButton && (
              <span
                href="/"
                onClick={this.toggleFavourite}
                className={"d-block card-action fa " + (isFavourite ? "fa-heart" : "fa-heart-o")}
              ></span>
            )}
            <div className="vehicle-labels">
              {inCampaign ? (
                <div className={"d-block vehicle-label campaign"} onClick={this.toggleModalInfo}>
                  <i className="fa fa-star"></i>
                  {"Edição BMcar Online"}
                </div>
              ) : (
                <>{label}</>
              )}
              {isCorporateProduct && (
                <div className={"vehicle-label bg-dark text-white"} onClick={this.toggleModalCorporateProduct}>
                  <i className="fa fa-suitcase"></i>Exclusivo Corporate
                </div>
              )}
              {isCorporateApresentation && (
                <div
                  className={"vehicle-label text-white"}
                  style={{ background: "#2a9ca9" }}
                  onClick={this.toggleModalCorporateApresentation}
                >
                  <i className="fa fa-leaf"></i>Benefícios Fiscais
                </div>
              )}
            </div>
            {reservationEndDate && <LabelCountdown endDate={reservationEndDate} />}
            {(isReserved || isSold || isFlashSale) && (
              <>
                {isReserved && <span className="vehicle-sticker font-weight-bold">Reservado</span>}
                {isSold && <span className="vehicle-sticker font-weight-bold">Vendido</span>}
                {isFlashSale && (
                  <div
                    className="vehicle-sticker font-weight-bold sticker-flashsale"
                    onClick={this.toggleModalFlashSales}
                  >
                    <FlashSaleCountdown flashSaleEndDate={flashSaleEndDate} flashSaleValue={flashSaleValue} />
                  </div>
                )}
              </>
            )}
          </picture>
          <figcaption className="card-vehicle-body bg-white d-flex flex-column flex-fill">
            <div className="p-adapt-3 flex-fill">
              <h3 className="texts font-weight-bold">
                {(brandName || "") + " " + (segmentName.toLowerCase() === brandName.toLowerCase() ? "" : segmentName)}
              </h3>
              {name && <span className="d-block h5 text-dark-grey">{name}</span>}
              <div className="inline-separators mt-3">
                <span className="h6 text-muted">{year === 1 ? new Date().getFullYear() : year}</span>
                <span className="h6 text-muted">{KmFormat(kilometers)}</span>
                {engine && <span className="h6 text-muted">{EngineTypeFormat(engine)}</span>}
              </div>
              <div className="inline-separators">
                {numberOfDoors && <span className="h6 text-muted">{numberOfDoors} Portas</span>}
                {displacement && <span className="h6 text-muted">{DisplacementFormat(displacement)}</span>}
                {powerHp && <span className="h6 text-muted">{powerHp} cv</span>}
              </div>
            </div>
            {isQuotationCard && (
              <div className="p-adapt-3 bg-pale-grey">
                <div className="row mt-1">
                  <div className="col-8 h6 text-muted">
                    <small className="font-weight-bold">{"Financiamento"}</small>
                  </div>
                  <div className="col-4 h6">{financeType ? financeType.label : "Não"}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-8 h6 text-muted">
                    <small className="font-weight-bold">{"Valor de Entrada"}</small>
                  </div>
                  <div className="col-4 h6">{EuroFormat(initialDeposit)}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-8 h6 text-muted">
                    <small className="font-weight-bold">{"Nº Mensalidades"}</small>
                  </div>
                  <div className="col-4 h6">{numberMonths || "---"}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-8 h6 text-muted">
                    <small className="font-weight-bold">{"Kms Totais"}</small>
                  </div>
                  <div className="col-4 h6">{annualMileage ? annualMileage + " km" : "---"}</div>
                </div>
                {!isSpecialCampaign && (
                  <div className="row mt-1">
                    <div className="col-8 h6 text-muted">
                      <small className="font-weight-bold">
                        {financeTypeId === 4 ? "Valor Futuro Estimado" : "Valor Residual"}
                      </small>
                    </div>
                    <div className="col-4 h6">{EuroFormat(recoveryValue)}</div>
                  </div>
                )}
              </div>
            )}
            {price && (
              <div
                className={
                  "vehicle-price pl-adapt-2 pt-adapt-1 pr-adapt-2 pb-adapt-1 position-relative " +
                  (inCampaign ? "campaign" : "")
                }
              >
                {!isSold ? (
                  <>
                    <small className="d-flex justify-content-between font-weight-bold mb-2" style={{ lineHeight: 1 }}>
                      <span>{financeType && financeType.label}</span>
                      <span>
                        {isCorporate && (
                          <>
                            <i className="fa fa-star mr-2"></i>Corporate
                          </>
                        )}
                      </span>
                    </small>
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <span className="d-block price_span" style={{ lineHeight: 1 }}>
                          {price > 0 && priceOriginal > 0 && price < priceOriginal && (
                            <span
                              className="listing_small old-price font-weight-bold mr-2 d-block"
                              style={{ lineHeight: 1 }}
                            >
                              {isLoan ? EuroFormat2Decimals(priceOriginal) : EuroFormat(priceOriginal)}
                            </span>
                          )}
                          {price && (isLoan ? EuroFormat2Decimals(price) : EuroFormat(price))}
                          <span className="h6">{isLoan && "/mês"}</span> <i className="icon-chevron-right"></i>
                        </span>
                      </div>
                      <div className="flex-shrink-1 align-self-end">
                        <span className="d-block price_span" style={{ lineHeight: 1 }}>
                          {taeg && isLoan && financeTypeId !== 4 && (
                            <>
                              <span className="h6">{"TAEG "}</span>
                              {TaxFormat2Decimals(taeg)}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    {financeTypeId !== 1 && financeTypeId !== 4 && (
                      <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                          <small>
                            <strong>MTC</strong>
                            {" " + EuroFormat(parseFloat(mtc).toFixed(2))}
                          </small>
                          <small>
                            <strong>MTIC</strong>
                            {" " + EuroFormat(parseFloat(mtic).toFixed(2))}
                          </small>
                          <small>
                            <strong>TAN</strong>
                            {" " + TaxFormat2Decimals(tan)}
                          </small>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="d-block price_span">{"Vendido"}</span>
                )}
              </div>
            )}
          </figcaption>
        </figure>
        {showModalInfo && <ModalCardVehicle onClose={this.toggleModalInfo} />}
        {showModalFlashSales && <ModalCardVehicleFlashSales onClose={this.toggleModalFlashSales} />}
        {showModalCorporateProduct && <ModalCardCorporateProduct onClose={this.toggleModalCorporateProduct} />}
        {showModalCorporateApresentation && 
          <ModalCardCorporateApresentation onClose={this.toggleModalCorporateApresentation} />
        }
      </Link>
    ) : (
      <></>
    );
  }
}

CardVehicle.defaultProps = {
  showFavoriteButton: true,
  isQuotationCard: false,
  inCampaign: false,
  findVehicle: false,
};

CardVehicle.propTypes = {
  showFavoriteButton: PropTypes.bool,
  vkey: PropTypes.string,
  onClick: PropTypes.func,
  vehicleId: PropTypes.string.isRequired,
  name: PropTypes.string,
  slug: PropTypes.string,
  brandName: PropTypes.string,
  modelName: PropTypes.string,
  segmentName: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number.isRequired,
  priceOriginal: PropTypes.number,
  taeg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mtc: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mtic: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  numberMonths: PropTypes.number,
  kilometers: PropTypes.number.isRequired,
  isNew: PropTypes.bool,
  isDemonstration: PropTypes.bool,
  isCorporate: PropTypes.bool,
  isCorporateApresentation: PropTypes.bool,
  isCorporateProduct: PropTypes.bool,
  isLoan: PropTypes.bool,
  isSold: PropTypes.bool,
  isReserved: PropTypes.bool,
  isFlashsale: PropTypes.bool,
  flashSaleValue: PropTypes.number,
  year: PropTypes.number.isRequired,
  engine: PropTypes.string,
  displacement: PropTypes.number,
  powerHp: PropTypes.number,
  numberOfDoors: PropTypes.number,
  inCampaign: PropTypes.bool,
  findVehicle: PropTypes.bool,
  //financial info
  isQuotationCard: PropTypes.bool,
  financeTypeId: PropTypes.number,
  initialDeposit: PropTypes.number,
  financialMode: PropTypes.string,
  recoveryValue: PropTypes.number,
  annualMileage: PropTypes.number,
  priceAtTime: PropTypes.number,
};

const mapStateToProps = (state, props) => {
  const { account, financeType } = state;
  const { vehicleId, isNew, isDemonstration, brandName, taeg } = props;

  return {
    isFavourite: vehicleId && account.favoritesIds && account.favoritesIds.indexOf(vehicleId) >= 0,
    financeTypes: financeType.constants,
    vehicleLabel:
      isDemonstration === true
        ? VEHICLE_LABELS[3]
        : isNew === true
        ? VEHICLE_LABELS[0]
        : brandName.toLowerCase() === "bmw"
        ? VEHICLE_LABELS[1]
        : VEHICLE_LABELS[2],
    taeg: taeg || "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (id) => dispatch(userActions.addFavorite(id)),
    removeFavorite: (id) => dispatch(userActions.removeFavorite(id)),
    googleProductClick: (product) => dispatch(googleActions.productClick(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardVehicle);
