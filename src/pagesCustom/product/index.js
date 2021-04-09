import React from "react";
import { graphql } from "gatsby";
//import config from "src/services/config";

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const API_URL = "https://bmcar-api.out.miewstudio.com/";

const ProductPage = ({ pageContext, location, data }) => {
    return <h1>{"pag. produto"}</h1>
//   return (
//     <>
//       <Layout title={pageContext.product.name}>
//         <Seo
//           title={pageContext.product.name}
//           metaDescription={pageContext.product.description}
//           canonical={`https://bmcar.pt/${pageContext.product.mainCategory.slugSimple}/${pageContext.product.slug}/`}
//           url={`https://bmcar.pt/${pageContext.product.mainCategory.slugSimple}/${pageContext.product.slug}/`}
//           image={
//             pageContext.product.images && pageContext.product.images.length > 0
//               ? API_URL + pageContext.product.images[0].url
//               : "https://bmcar-wp.prod.miewstudio.com/wp-content/uploads/2020/04/explorar-scaled.jpg"
//           }
//         />
//         <LayoutStore
//           menu={pageContext.menu}
//           category={location.state && location.state.category}
//           categoryPath={
//             location.state && location.state.categoryPath
//               ? location.state.categoryPath
//               : pageContext.product.categoryPath
//           }
//           isToCloseCart={location.state && location.state.isToCloseCart}
//           showGoBack={true}
//         >
//           <Product
//             product={pageContext.product}
//             imagesProduct={data.sitePage.imagesProduct}
//             imagesDescription={data.sitePage.imagesDescription}
//             productDescription={data.sitePage.childHtmlRehype.htmlAst}
//           />
//         </LayoutStore>
//       </Layout>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Product",
//             url: `https://bmcar.pt/${pageContext.product.mainCategory.slugSimple}/${pageContext.product.slug}/`,
//             sku: `${pageContext.product.serialNumber}`,
//             mpn: `${pageContext.product.serialNumber}`,
//             name: `${pageContext.product.name}`,
//             image: pageContext.product.images.map((img) => `${API_URL + img.url}`),
//             brand: {
//               "@type": "Brand",
//               name: `${pageContext.product.brandName || "BMW"}`,
//             },
//             manufacturer: "Bayerische Motoren Werke AG",
//             description: `${pageContext.product.description}`,
//             offers: {
//               "@type": "Offer",
//               url: `https://bmcar.pt/${pageContext.product.mainCategory.slugSimple}/${pageContext.product.slug}/`,
//               businessFunction: "http://purl.org/goodrelations/v1#Sell",
//               price: `${pageContext.product.price}`,
//               priceValidUntil: formatDate(new Date()),
//               priceCurrency: "EUR",
//               availability: "http://schema.org/InStock",
//               itemCondition: "https://schema.org/NewCondition",
//             },
//           }),
//         }}
//       ></script>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             itemListElement: [
//               {
//                 "@type": "ListItem",
//                 position: 1,
//                 name: "Loja",
//                 item: `https://bmcar.pt${STORE_PATH}`,
//               },
//               ...pageContext.product.categoryPath.map((path, i) => {
//                 return {
//                   "@type": "ListItem",
//                   position: i + 2,
//                   name: path.name,
//                   item: `https://bmcar.pt${STORE_PATH}${path.slug}/`,
//                 };
//               }),
//             ],
//           }),
//         }}
//       ></script>
//     </>
//   );
};

export default ProductPage;

/* eslint-disable */
export const query = graphql`
  query PageQuery($path: String) {
    sitePage(path: { eq: $path }) {
      childHtmlRehype {
        htmlAst
      }
      imagesDescription {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder:BLURRED)
        }
      }
      imageProduct {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder:BLURRED)
        }
      }
      imagesProduct {
        name
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH,placeholder:BLURRED )
        }
      }
    }
  }
`;
