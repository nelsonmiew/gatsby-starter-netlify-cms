/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "whatwg-fetch";
// import "jquery/dist/jquery.js";
// import "popper.js/dist/popper.min";
import $ from 'jquery';
//import "bootstrap/dist/js/bootstrap.min.js";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "react-widgets/dist/css/react-widgets.css";
// import "./src/stylesheets/main.css";
// import "./src/stylesheets/modules/slick.css";
window.jQuery = $;
window.$ = $;

export const onClientEntry = () => {
  window.onload = () => {
    document.body.classList.add("doc-ready");
  };
};

export const onInitialClientRender = () => {
  document.body.classList.add("doc-ready");
};

export const onRouteUpdate = (_, pluginOptions) => {
  if (process.env.NODE_ENV === `production`) {
    // wrap inside a timeout to ensure the title has properly been changed
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "gatsby-route-change" });

        if(document.querySelector('#___gatsby > .miew-modal')){
          [...document.querySelectorAll('#___gatsby > .miew-modal')].forEach(function(el){
            el.parentNode.removeChild(el);
          });
        }
      }, 50);
    }
  }
};

export { default as wrapRootElement } from "./src/redux/reduxWrapper";
