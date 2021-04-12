import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { ImgPlaceholder } from "src/components/GlobalComponents";

const ImageProduct = ({ slug, originalSrc, altImage, aspectRatioW, aspectRatioH, objectFit, imageRef, ...props }) => {
  
  const data = useStaticQuery(graphql`
    query {
      allSitePage(filter: { id: { regex: "SitePage /" } }) {
        edges {
          node {
            path
            imageProduct {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH,placeholder:BLURRED )
              }
            }
          }
        }
      }
    }
  `);

  const edge =
    data.allSitePage && data.allSitePage.edges && data.allSitePage.edges.find((e) => e.node.path === "/" + slug + "/");

  if (edge && edge.node.imageProduct) {    
    return (
      <GatsbyImage
        //fluid={{ ...edge.node.imageProduct.childImageSharp.fluid, aspectRatio: aspectRatioW / aspectRatioH }}
        image={edge.node.imageProduct.childImageSharp.gatsbyImageData}
        imgStyle={{ objectFit: objectFit || "contain" }}
        alt={altImage}
         {...props}
      />
    );
  } else {
    return (
      <picture>
        <ImgPlaceholder width={aspectRatioW} height={aspectRatioH} />
        <span
          role="img"
          ref={imageRef}
          aria-label={altImage}
          className="has_bg lazy-media lazy-fade show"
          data-background-image={originalSrc}
        ></span>
      </picture>
    );
  }
};

export default ImageProduct;
