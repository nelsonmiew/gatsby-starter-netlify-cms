import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import ReactHtmlParser from "react-html-parser";

const dafaultImage = "https://bmcar-wp.prod.miewstudio.com/wp-content/uploads/2019/11/header_01.png";

function Seo({
  title,
  headMetas,
  metaDescription,
  image,
  url,
  canonical,
  author,
  facebookTitle,
  facebookDescription,
  facebookType,
  facebookImage,
  twitterTitle,
  twitterUsername,
  twitterDescription,
  twitterImage,
  twitterCardType,
}) {
  if (headMetas) {
    return (
      <Helmet
        title={title}
        link={
          canonical
            ? [
                {
                  rel: "canonical",
                  href: canonical,
                },
              ]
            : []
        }
      >
        {ReactHtmlParser(headMetas, {
          transform: (node) => {
            if (node.type === "tag" && node.name === "meta" && node.attribs && node.attribs.name === "robots") {
              return null;
            } else if (
              node.type === "tag" &&
              node.name === "meta" &&
              node.attribs &&
              node.attribs.property === "og:locale"
            ) {
              return null;
            } else if (
              node.type === "tag" &&
              node.name === "meta" &&
              node.attribs &&
              (node.attribs.property === "og:url" || node.attribs.property === "twitter:site")
            ) {
              return (
                <meta
                  property={node.attribs.property}
                  content={node.attribs.content
                    .replace("bmcar-wp.out.miewstudio.com", "bmcar.pt")
                    .replace("bmcar-wp.prod.miewstudio.com", "bmcar.pt")}
                />
              );
            } else if (
              node.type === "tag" &&
              node.name === "link" &&
              node.attribs &&
              node.attribs.rel === "canonical"
            ) {
              return (
                <link
                  rel="canonical"
                  href={node.attribs.href
                    .replace("bmcar-wp.out.miewstudio.com", "bmcar.pt")
                    .replace("bmcar-wp.prod.miewstudio.com", "bmcar.pt")}
                ></link>
              );
            } else if (node.type === "comment") {
              return null;
            }
          },
        })}
      </Helmet>
    );
  } else {
    const seoTitle = title || "BMcar Online";
    const seoMetaDescription =
      metaDescription ||
      "Feel, Buy and Drive. Catálogo Online BMcar: para encontrar o carro com que sempre sonhou bastam três cliques - configurar, selecionar e checkout.";

    return (
      <Helmet
        title={seoTitle}
        link={
          canonical
            ? [
                {
                  rel: "canonical",
                  href: canonical,
                },
              ]
            : []
        }
      >
        <meta name="description" content={seoMetaDescription} />
        <meta name="image" content={image || dafaultImage} />
        {url && <meta property="og:url" content={url} />}
        <meta property="og:type" content={facebookType || "website"} />
        <meta property="og:title" content={facebookTitle || seoTitle} />
        <meta property="og:description" content={facebookDescription || seoMetaDescription} />
        <meta property="og:image" content={facebookImage || image} />
        <meta name="twitter:card" content="summary_large_image" />
        {url && <meta name="twitter:site" content={url} />}
        {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
        <meta name="twitter:title" content={twitterTitle || seoTitle} />
        <meta name="twitter:description" content={twitterDescription || seoMetaDescription} />
        <meta name="twitter:image" content={twitterImage || image} />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
  facebookTitle: PropTypes.string,
  facebookDescription: PropTypes.string,
  facebookImage: PropTypes.string,
  facebookType: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterUsername: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterImage: PropTypes.string,
  twitterCardType: PropTypes.string,
};

export default Seo;