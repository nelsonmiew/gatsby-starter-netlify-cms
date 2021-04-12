import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { change, Field, formValueSelector, reduxForm } from "redux-form";
import { STORE_PATH, PRODCUTS_ORDER_BY_PROPERTIES } from "../GlobalConstants";
import { FilterColorTypesField } from "../FormComponents/ReduxFormFields/ReduxFormFields";
import { CheckboxField } from "../FormComponents/ReduxFormFields/CheckboxField";
import CardProduct from "../Cards/CardProduct";
import Sticky from "react-stickynode";
import { navigate } from "../GlobalComponents";
//import DestaqueListagem from "../ExploreVehicles/components/DestaqueListagem";
import { globalHistory } from "@reach/router";
import { parse } from "query-string";
import { renderSelect } from "../FormComponents/ReduxFormRenders/InputsRenders";
import { StringToSlug } from "../Helpers/valuesFormatters";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersIsOpen: false,
      limitProducts: props.lastLimitProducts || 20,
      catalogProducts: props.products || [],
    };
    console.log(props);
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  componentDidMount() {
    const { lastLimitProducts } = this.props;

    this.mapUrlParameters();

    if (document.body) document.body.classList.remove("overHidden-filters");

    // console.log("lastLimitProducts", lastLimitProducts);
    if (lastLimitProducts) {
      this.setState({ limitProducts: lastLimitProducts });
    }

    window.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.trackScrolling);
  }

  componentDidUpdate(prevProps) {
    const { filterCategories, filterAttributes, filterPrice, orderByProperty } = this.props;

    if (
      prevProps.filterCategories !== filterCategories ||
      prevProps.orderByProperty !== orderByProperty ||
      prevProps.filterAttributes !== filterAttributes ||
      prevProps.filterPrice !== filterPrice
    ) {
      this.sortProducts();
      this.updateUrl();
    }
  }

  mapUrlParameters() {
    // console.log("map url");
    const { filters, filterPrice, filterAttributes, doChange } = this.props;

    const queryParams = parse(globalHistory.location.search, { arrayFormat: "separator", arrayFormatSeparator: "_" });

    if (queryParams && Object.keys(queryParams).length > 0) {
      let newFilterPrice = {};
      let newFilterAttributes = {};

      Object.keys(queryParams).forEach((param) => {
        if (param === "preco") {
          if (Array.isArray(queryParams[param])) {
            queryParams[param].forEach((p) => {
              newFilterPrice["p-" + p] = true;
            });
          } else {
            newFilterPrice["p-" + queryParams[param]] = true;
          }
        } else {
          const attr = filters.find((f) => StringToSlug(f.name) === param);

          if (attr) {
            newFilterAttributes[attr.id] = {};

            attr.attributesValue
              .filter((av) =>
                Array.isArray(queryParams[param])
                  ? queryParams[param].some((paramValue) => paramValue === StringToSlug(av.name))
                  : queryParams[param] === StringToSlug(av.name)
              )
              .forEach((av) => {
                newFilterAttributes[attr.id][av.id] = true;
              });
          }
        }
      });

      if (
        JSON.stringify(filterPrice) === JSON.stringify(newFilterPrice) &&
        JSON.stringify(filterAttributes) === JSON.stringify(newFilterAttributes)
      ) {
        this.sortProducts();
      } else {
        if (newFilterPrice) {
          doChange("filterPrice", newFilterPrice);
        }

        if (newFilterAttributes) {
          doChange("filterAttributes", newFilterAttributes);
        }
      }
    } else {
      this.updateUrl();
      this.sortProducts();
    }
  }

  sortProducts() {
    // console.log("sort products");
    const { filterCategories, orderByProperty, products, selectedPrices, selectedAttributes } = this.props;

    const selectedCategories = filterCategories ? Object.keys(filterCategories).filter((k) => filterCategories[k]) : [];

    const productsFiltered =
      selectedCategories.length > 0 || selectedAttributes.length > 0 || selectedPrices.length > 0
        ? products.filter((p) => {
            const attrValuesIds = p.attributes.flatMap((a) =>
              a.attributesValue.map((av) => (av.colorTypeId > 0 ? "c" + av.colorTypeId : av.id))
            );

            return (
              (selectedCategories.length > 0 ? p.categories.some((c) => selectedCategories.includes(c)) : true) &&
              (selectedAttributes.length > 0
                ? selectedAttributes.every((attr) =>
                    attrValuesIds.some((av) => attr.childs.map((c) => c.id).includes(av))
                  )
                : true) &&
              (selectedPrices.length > 0 ? selectedPrices.some((pv) => p.price >= pv - 50 && p.price <= pv) : true)
            );
          })
        : products;
          
    const productsSorted = orderByProperty
      ? productsFiltered.sort((a, b) => orderBy(a, b, orderByProperty))
      : productsFiltered;

    this.setState({ catalogProducts: productsSorted });
  }

  updateUrl() {
    // console.log("update url");
    const { selectedPrices, selectedAttributes } = this.props;

    const currentPath = globalHistory.location.pathname;
    const currentSearch = globalHistory.location.search;

    let newQuery = "";
    if (selectedAttributes.length > 0) {
      selectedAttributes.forEach((selectedAttribute) => {
        newQuery += `&${StringToSlug(selectedAttribute.name)}=${selectedAttribute.childs
          .map((av) => StringToSlug(av.name))
          .join("_")}`;
      });
    }

    if (selectedPrices.length > 0) {
      newQuery += `&preco=${selectedPrices.join("_")}`;
    }

    if (newQuery) {
      // console.log('new query');
      navigate(`${currentPath}?${newQuery.substring(1)}`);
    } else if (currentSearch.substring(1) !== newQuery.substring(1)) {
      // console.log('search diff');
      navigate(`${currentPath}`);
    }
  }

  removeFilter(attrId, attrValueId, e) {
    if (e) e.preventDefault();

    const { filterAttributes, doChange } = this.props;
    const newFilterAttributes = { ...filterAttributes };

    newFilterAttributes[attrId][attrValueId] = false;

    doChange("filterAttributes", newFilterAttributes);
  }

  removeFilterPrice(price, e) {
    if (e) e.preventDefault();

    const { filterPrice, doChange } = this.props;
    const newFilterPrice = { ...filterPrice };

    newFilterPrice["p-" + price] = false;

    doChange("filterPrice", newFilterPrice);
  }

  toggleFilters(e) {
    if (e) e.preventDefault();
    const { filtersIsOpen } = this.state;

    if (filtersIsOpen) {
      if (document.body) document.body.classList.remove("overHidden-filters");
    } else {
      if (document.body) document.body.classList.add("overHidden-filters");
    }

    this.setState({ filtersIsOpen: !filtersIsOpen });
  }

  navigateCategory(categoryPath, e) {
    if (e) e.preventDefault();
    this.setState({ filtersIsOpen: false });
    navigate(categoryPath);
  }

  isBottom() {
    const wrappedElement = document.getElementsByClassName("layout")[0];
    return window.innerHeight + window.scrollY >= wrappedElement.offsetHeight;
  }

  trackScrolling = () => {
    if (this.isBottom()) {
      // console.log("header bottom reached");
      document.removeEventListener("scroll", this.trackScrolling);

      const { doChange } = this.props;
      const { limitProducts, catalogProducts } = this.state;

      const newLimitProducts =
        catalogProducts.length > limitProducts + 20 ? limitProducts + 20 : catalogProducts.length;
      const isProductsLimit = newLimitProducts === catalogProducts.length;

      doChange("lastLimitProducts", newLimitProducts);

      this.setState({ limitProducts: newLimitProducts }, () => {
        if (!isProductsLimit) document.addEventListener("scroll", this.trackScrolling);
      });
    }
  };

  render() {
    const {
      category,
      categoryPath,
      childCategories,
      filters,
      destaques,
      selectedAttributes,
      selectedPrices,
      priceFilterStep,
    } = this.props;

    const { catalogProducts, filtersIsOpen, limitProducts } = this.state;

    const orderField = (prefix) => (
      <div className="position-relative">
        <label
          className="small position-absolute text-muted"
          htmlFor={(prefix || "") + "orderByProperty"}
          style={{ top: "0px", left: "12px" }}
        >
          Ordenar:
        </label>
        <Field
          id={(prefix || "") + "orderByProperty"}
          name={(prefix || "") + "orderByProperty"}
          placeholder={"Por defeito"}
          className="custom-select mb-0 ml-auto text-charcoal-grey"
          onChageValue={(value) => this.props.doChange("orderByProperty", value)}
          options={PRODCUTS_ORDER_BY_PROPERTIES}
          component={renderSelect}
          style={{ maxWidth: "200px" }}
        />
      </div>
    );

    return (
      <div className="page-content pb-adapt-7">
        <div className="container">
          <div className="row columns is-multiline">
            <div className="column is-12 col-12 mb-3 d-block d-lg-flex">
              <h2 className="font-weight-bold h4">
                {category ? category.name : "Catálogo"}
                <span className="texts text-muted ml-2">{"(" + (catalogProducts || []).length + ")"}</span>
              </h2>
              <div className="d-flex d-lg-none filters-toggle mt-2">
                <Sticky top={108} innerClass={"shadow-sm"} className="w-100">
                  <div className="d-flex mt-1 mb-1">
                    <span
                      className="d-flex align-items-center justify-content-center w-50 mr-1 border border-pale-grey pr-2 text-charcoal-grey"
                      style={{ height: "42px" }}
                      onClick={() => {
                        this.toggleFilters();
                      }}
                    >
                      <i className="fa fa-filter mr-adapt-1"></i>
                      Filtrar{" "}
                      {selectedAttributes && selectedAttributes.length > 0 && <>({selectedAttributes.length})</>}
                    </span>
                    <div className="d-flex align-items-center border border-pale-grey w-50 ml-1">
                      {orderField("m-")}
                    </div>
                  </div>
                </Sticky>
              </div>
              <hr className="mb-0 border-pale-lilac" />
              <div className="d-none d-lg-block ml-auto mr-0">{orderField()}</div>
            </div>
            <div
              className={ 
                "column is-3 col-12 col-lg-3 col-xxl-2 filters-container d-flex flex-column h-100 p-0" +
                (filtersIsOpen ? " open" : "")
              }
            >
              <div className="d-flex d-lg-none align-items-center filters-head pl-3 pr-3">
                <a
                  href="/"
                  className="d-block listing_text text-dark pt-2 pb-2 d-flex align-items-center w-100"
                  onClick={this.toggleFilters}
                >
                  <span className="font-weight-bold text-dark">Filtros</span>
                  <span className="text-muted pr-2 ml-auto mr-0">Voltar</span>
                  <i className="fa fa-angle-left h3 ml-0 mr-0"></i>
                </a>
              </div>
              <div className="filters-list h-100 overflow-hidden">
                <div className="flex-fill overflow-auto h-100 p-3 p-lg-0 pl-lg-2 pr-lg-2">
                  <h3 className="font-weight-bold mb-3 d-block d-lg-none">{category ? category.name : "Catálogo"}</h3>
                  {childCategories && childCategories.length > 0 && (
                    <>
                      <p className="font-weight-bold mb-3">Categoria</p>
                      {childCategories.map((cat) => (
                        <Fragment key={"cat-filter-" + cat.id}>
                          {cat.level > 2 ? (
                            <CheckboxField
                              id={"cat-check-" + cat.id}
                              name={"filterCategories[" + cat.id + "]"}
                              className="d-block mt-3 mb-3"
                              label={
                                cat.name +
                                " (" +
                                catalogProducts.filter((p) => p.categories.includes(cat.id)).length +
                                ")"
                              }
                            />
                          ) : (
                            <a
                              href="/"
                              onClick={this.navigateCategory.bind(this, STORE_PATH + cat.slug + "/")}
                              className="d-block pb-2 mb-1"
                            >
                              {cat.name +
                                " (" +
                                catalogProducts.filter((p) => p.categories.includes(cat.id)).length +
                                ")"}
                            </a>
                          )}
                        </Fragment>
                      ))}
                      <hr />
                    </>
                  )}
                  {((selectedAttributes && selectedAttributes.length > 0) ||
                    (selectedPrices && selectedPrices.length > 0)) && (
                    <>
                      <div className="d-flex flex-wrap">
                        {selectedAttributes &&
                          selectedAttributes.map((attr, i) => (
                            <Fragment key={"a-filter-" + i}>
                              {attr.childs.map((attrValue, k) => (
                                <div
                                  key={"s-filter-" + i + "-" + k}
                                  className="d-inline-block listing_small border border-1 rounded-pill pl-3 py-2 mb-1"
                                >
                                  <span>{attr.name}</span>
                                  <strong className="pl-1">{attrValue.name}</strong>
                                  <a
                                    href="/"
                                    className="pl-1 pr-2 mr-1 text-muted"
                                    onClick={this.removeFilter.bind(this, attr.id, attrValue.id)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </a>
                                </div>
                              ))}
                            </Fragment>
                          ))}
                        {selectedPrices &&
                          selectedPrices.map((attrP, i) => (
                            <div
                              key={"p-filter-" + i}
                              className="d-inline-block listing_small border border-1 rounded-pill pl-3 py-2 mb-1"
                            >
                              <span>Preço</span>
                              <strong className="pl-1">{parseInt(attrP) - priceFilterStep + "-" + attrP + "€"}</strong>
                              <a
                                href="/"
                                className="pl-1 pr-2 mr-1 text-muted"
                                onClick={this.removeFilterPrice.bind(this, attrP)}
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            </div>
                          ))}
                      </div>
                      <hr />
                    </>
                  )}
                  {filters &&
                    filters.map((attr) => (
                      <Fragment key={"filter-" + attr.id}>
                        <p className="font-weight-bold mb-3">{attr.name}</p>
                        <div
                          className={
                            attr.attributesValue.length > 8
                              ? "d-flex flex-wrap justify-content-between"
                              : "d-flex flex-column"
                          }
                        >
                          {attr.attributesValue[0].colorTypeId === 0 ? (
                            attr.attributesValue.map((attrValue) => (
                              <CheckboxField
                                key={"filter-" + attr.id + "-" + attrValue.id}
                                id={"filter-" + attr.id + "-" + attrValue.id}
                                name={"filterAttributes[" + attr.id + "][" + attrValue.id + "]"}
                                className="mb-3 w-50"
                                label={attrValue.name}
                              />
                            ))
                          ) : (
                            <FilterColorTypesField
                              name={"filterAttributes[" + attr.id + "]"}
                              colorTypes={attr.attributesValue.map((attrValue) => {
                                return {
                                  id: "c" + attrValue.colorTypeId,
                                  name: attrValue.name,
                                  code: attrValue.colorTypeCode,
                                };
                              })}
                            />
                          )}
                        </div>
                        <hr />
                      </Fragment>
                    ))}
                  <p className="font-weight-bold mb-3">Preço de produto</p>
                  {[...Array(4)].map((arr, i) => (
                    <CheckboxField
                      key={"filter-price-" + i}
                      id={"filter-price-" + i}
                      name={"filterPrice[p-" + (i + 1) * priceFilterStep + "]"}
                      className="d-block mt-3 mb-3"
                      label={i * priceFilterStep + "€ - " + (i + 1) * priceFilterStep + "€"}
                    />
                  ))}
                  <div className="d-flex d-lg-none">
                    <button
                      type="button"
                      className="button-big listing_text font-weight-bold w-100  mt-2"
                      onClick={this.toggleFilters}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="column col-12 col-lg-9 col-xxl-10">
              <div className="row columns is-multiline">
                {catalogProducts &&
                  catalogProducts.map((product, i) => (
                    <Fragment key={"product-lst-" + i}>
                      {i <= limitProducts && (
                        <>
                          {/* {destaques && (i + 1) % 11 === 0 && destaques.length >= (i + 1) / 11 && (
                            <DestaqueListagem
                              className={"col-12 col-xl-4 col-xxxl-8 mb-adapt-4"}
                              id={(i + 1) / 11}
                              destaque={destaques[(i + 1) / 11 - 1]}
                              observer={this.props.observer}
                            />
                          )} */}

                          <div
                            className={"column is-4  col-6 col-xl-4  mb-adapt-4 " + (i % 2 === 1 ? "pl-1 pl-xl-2" : "pr-1 pr-xl-2")}
                            key={"product-" + product.id}
                          >
                       
                            <CardProduct
                              className="h-100"
                              productId={product.id}
                              slug={product.slug}
                              name={product.name}
                              price={product.price}
                              priceOriginal={product.priceOriginal}
                              discount={product.discount}
                              isDiscountPercentage={product.isDiscountPercentage}
                              imageUrl={product.imageProductUrl}
                              isFeatured={product.isFeatured}
                              hasStock={product.hasStock}
                              observer={this.props.observer}
                              mainCategory={product.mainCategory}
                              category={category}
                              categoryPath={categoryPath}
                            />
                          </div>
                        </>
                      )}
                    </Fragment>
                  ))}
              </div>
            </div>
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
  forceUnregisterOnUnmount: false,
})(index);

const orderBy = (a, b, orderByProperty) => {
  const orderByProp = orderByProperty.split("-")[0];
  const orderByAsc = orderByProperty.split("-")[1] === "1";
  const productProperty = orderByProp === "1" ? "price" : "publishedDate";
  let propA = a[productProperty];
  let propB = b[productProperty];

  if (orderByProp === "2") {
    propA = new Date(propA);
    propB = new Date(propB);
  }

  let comparison = 0;
  if (propA > propB) {
    comparison = orderByAsc ? 1 : -1;
  } else if (propA < propB) {
    comparison = orderByAsc ? -1 : 1;
  }

  return comparison;
};

const mapStateToProps = (state, props) => {
  const { lastLimitProducts, filterCategories, filterAttributes, filterPrice, orderByProperty } = selector(
    state,
    "lastLimitProducts",
    "filterCategories",
    "filterAttributes",
    "filterPrice",
    "orderByProperty"
  );

  const { filters } = props;

  return {
    filterCategories,
    filterAttributes,
    selectedAttributes: filterAttributes
      ? Object.keys(filterAttributes)
          .filter((k) => filters.some((f) => f.id === k))
          .map((k) => {
            const attr = filters.find((f) => f.id === k);
            return {
              id: k,
              name: attr.name,
              childs: Object.keys(filterAttributes[k])
                .filter((kAttrV) => filterAttributes[k][kAttrV])
                .map((c) => {
                  const attrValue = attr.attributesValue.find((av) => av.id === c);
                  return {
                    id: attrValue.id,
                    name: attrValue.name,
                  };
                }),
            };
          })
          .filter((c) => c.childs.length > 0)
      : [],
    priceFilterStep: 50,
    filterPrice,
    selectedPrices: filterPrice
      ? Object.keys(filterPrice)
          .filter((k) => filterPrice[k])
          .map((p) => parseInt(p.replace("p-", "")))
      : [],
    orderByProperty,
    lastLimitProducts,
    initialValues: {
      orderByProperty: "",
      lastLimitProducts: 20,
      ac_contactType: "email",
    },
  };
};
//export default index;
index = reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
})(index);

const mapDispatchToProps = (dispatch) => {
  return {
    doChange: (y, z) => dispatch(change(FORM_NAME, y, z)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(index);


