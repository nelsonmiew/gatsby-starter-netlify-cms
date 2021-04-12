import React, { Component } from "react";
import ChartSlider from "./ChartSlider";

export class NumberOfMonthsSlider extends Component {
  render() {
    return (
      <ChartSlider {...this.props} />
    );
  }
}

NumberOfMonthsSlider.defaultProps = {
  min: 24,
  max: 60,
  step: 12,
  defaultValue: 48,
  prefix: "",
  postfix: "",
  isCard: false
};

export default NumberOfMonthsSlider;
