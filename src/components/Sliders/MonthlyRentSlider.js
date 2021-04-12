import React, { Component } from "react";
import ChartSlider from "./ChartSlider";

export class MonthlyRentSlider extends Component {
  render() {
    return (
      <ChartSlider {...this.props} />
    );
  }
}

MonthlyRentSlider.defaultProps = {
  min: 220,
  max: 860,
  step: 10,
  defaultValue: 300,
  prefix: "",
  postfix: "€",
  isCard: false
};

export default MonthlyRentSlider;
