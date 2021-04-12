import React from "react";
import { navigate as gatsbyNavigate, Link as GatsbyLink } from "gatsby";
import { EXPLORE_VEHICLES_PATH } from "../GlobalConstants";

export const navigate = (to, settings) => {
  gatsbyNavigate(to, settings);
};

export const Link = ({ to, label, onClick, className, disabled }) => {
  return (
    <GatsbyLink to={to || "back"} onClick={onClick} className={className} disabled={disabled}>
      {label}
    </GatsbyLink>
  );
};

export const ImgPlaceholder = ({ width, height, className }) => {
  const style = "margin:auto;";

  let fillSize = (height / width) * 100;

  return (
    <div className={"aspectRatioPlaceholder" + (className ? " " + className : '')}>
      <div className="fill" style={{ paddingBottom: fillSize + "%" }}></div>
    </div>
  );
};

export const EmptyState = ({ message, label, to }) => {
  if (!message) message = "Encontra-se numa estrada sem saída, não existe nada aqui!";
  if (!label) label = "Explore";
  if (!to) to = EXPLORE_VEHICLES_PATH;

  return (
    <div className="empty-content">
      <p className="mt-adapt-2">{message}</p>
      <GatsbyLink to={""} className={"button-big mt-adapt-4"}>
        {label}
      </GatsbyLink>
    </div>
  );
};

export const GoBack = () => {
  window.history.back();
};

export default {
  navigate,
  Link,
  GoBack,
  ImgPlaceholder
};
