/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import Helmet from "react-helmet";

export { default as wrapRootElement } from "./src/redux/reduxWrapper";

// export function replaceRenderer ({ replaceBodyHTMLString }) {
//   replaceBodyHTMLString('<div id="___gatsby"></div>');
// };

export function onPreRenderHTML({ getHeadComponents, replaceHeadComponents }) {
  const headComponents = getHeadComponents();

  for (var i = 0; i < headComponents.length; i++) {
    if (headComponents[i].type === "script") {
      headComponents.splice(i, 1);
      i--;
    } 
    // else if (headComponents[i].type === "style") {
    //   //const link =  <link rel="stylesheet" href={headComponents[i].props["data-href"]} defer />
    //   const link = (
    //     <>
    //       <link
    //         rel="preload"
    //         href={headComponents[i].props["data-href"]}
    //         as="style"
    //         onload="this.onload=null;this.rel='stylesheet'"
    //       />
    //       <noscript>
    //         <link rel="stylesheet" href={headComponents[i].props["data-href"]} />
    //       </noscript>
    //     </>
    //   );
    //   headComponents.splice(i, 1, link);
    //   i--;
    // }
  }

  replaceHeadComponents(headComponents);
}

export function onRenderBody({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) {
  const helmet = Helmet.renderStatic();
  //console.log(helmet, helmet.script);
  // setHeadComponents([
  //   <script type="text/javascript" src="https://abc.com/abc/abc0123.js" />,
  //   <script
  //     dangerouslySetInnerHTML={{
  //       __html: `
  //         // javascript code
  //  	    `,
  //     }}
  //   />,
  // ]);

  setPostBodyComponents([helmet.noscript.toComponent(), helmet.script.toComponent()]);
}
