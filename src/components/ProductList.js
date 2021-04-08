import React, { Component } from 'react'

export default class ProductList extends Component {
    render() {
return (<div>
    <h1>Teste de lista de produtos</h1>
</div>)

        // return (
        //     <div>
        //     <div className="col-12 col-lg-9 col-xxl-10">
        //       <div className="row">
        //         {catalogProducts &&
        //           catalogProducts.map((product, i) => (
        //             <Fragment key={"product-lst-" + i}>
        //               {i <= limitProducts && (
        //                 <>
        //                   {destaques && (i + 1) % 11 === 0 && destaques.length >= (i + 1) / 11 && (
        //                     <DestaqueListagem
        //                       className={"col-12 col-xl-4 col-xxxl-8 mb-adapt-4"}
        //                       id={(i + 1) / 11}
        //                       destaque={destaques[(i + 1) / 11 - 1]}
        //                       observer={this.props.observer}
        //                     />
        //                   )}

        //                   <div
        //                     className={"col-6 col-xl-4 mb-adapt-4 " + (i % 2 === 1 ? "pl-1 pl-xl-2" : "pr-1 pr-xl-2")}
        //                     key={"product-" + product.id}
        //                   >
        //                     <CardProduct
        //                       className="h-100"
        //                       productId={product.id}
        //                       slug={product.slug}
        //                       name={product.name}
        //                       price={product.price}
        //                       priceOriginal={product.priceOriginal}
        //                       discount={product.discount}
        //                       isDiscountPercentage={product.isDiscountPercentage}
        //                       imageUrl={product.imageProductUrl}
        //                       isFeatured={product.isFeatured}
        //                       hasStock={product.hasStock}
        //                       observer={this.props.observer}
        //                       mainCategory={product.mainCategory}
        //                       category={category}
        //                       categoryPath={categoryPath}
        //                     />
        //                   </div>
        //                 </>
        //               )}
        //             </Fragment>
        //           ))}
        //       </div>
        //     </div>
        //     </div>
        // )
    }
}
