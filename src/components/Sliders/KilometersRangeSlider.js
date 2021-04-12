import React, { Component } from "react";
import ChartSlider from "./ChartSlider";

export class KilometersRangeSlider extends Component {
  render() {
    return <ChartSlider {...this.props} />;
  }
}

KilometersRangeSlider.defaultProps = {
  min: 0,
  max: 300000,
  step: 10000,
  defaultValue: [0, 300000],
  prefix: "",
  postfix: "km",
  chartStrict: false,
  isCard: false,
  chartKey: "kilometers-range-chart",
};

export default KilometersRangeSlider;
