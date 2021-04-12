import React, { Component } from "react";
import ChartSlider from "./ChartSlider";

export class NumberOfKilometersSlider extends Component {
  render() {
    return (
      <ChartSlider {...this.props} />
    );
  }
}

NumberOfKilometersSlider.defaultProps = {
  min: 20000,
  max: 200000,
  step: 10000,
  defaultValue: 0,
  prefix: "",
  postfix: "km",
  isCard: false
};

export default NumberOfKilometersSlider;
