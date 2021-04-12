import React, { Component, Fragment } from 'react'
import { StaticQuery, graphql } from "gatsby";

import CardProduct from './Catalog/CardProduct';

export default class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gdata: undefined
    }
  }

  render() {
    const { gdata } = this.state;
    const catalogProducts = (gdata && gdata.bmcarApi && gdata.bmcarApi.products.slice(0, 10)) || [];
    const limitProducts = 20;

    const category = "";
    const categoryPath = "";


    return (
      <div>
        <StaticQuery
          query={graphql`
          query {            
            bmcarApi {
              products {
                name
                price
                hasStock
                imageProductUrl
                slug
                mainCategory {
                  name
                  slugSimple
                }
              }
            }
        }
        `}
          render={(data) => {
            const catalogProducts = (data && data.bmcarApi && data.bmcarApi.products.slice(0, 10)) || [];
            return (
              <div className="columns is-multiline">
                {catalogProducts &&
                  catalogProducts.map((product, i) => (
                    <Fragment key={"product-lst-" + i}>
                      {i <= limitProducts && (
                        <>
                          <div
                            className={"column is-4 " + (i % 2 === 1 ? "pl-1 pl-xl-2" : "pr-1 pr-xl-2")}
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
            )
          }}

        />



      </div>
    )
  }
}


