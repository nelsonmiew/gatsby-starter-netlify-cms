import React from "react";

export const TitleRow = function (props) {
  return (
    <div className="d-block mt-adapt-7 mb-adapt-3">
      <h4 className="texts font-weight-bold">{props.title}</h4>
      {props.subTitle && props.subTitle !== "" && <span className="d-block listing_small mt-3">{props.subTitle}</span>}
    </div>
  );
};
