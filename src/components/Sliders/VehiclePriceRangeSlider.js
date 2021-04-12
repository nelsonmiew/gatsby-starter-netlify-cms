import React, { Component } from "react";
import { connect } from "react-redux";
import ChartSlider from "./ChartSlider";

export class VehiclePriceRangeSlider extends Component {
  render() {
    return (
      <ChartSlider {...this.props} />
    );
  }
}

VehiclePriceRangeSlider.defaultProps = {
  min: 15000,
  max: 150000,
  step: 1000,
  defaultValue: [15000, 75000],
  prefix: "",
  postfix: "€",
  chartStrict: false,
  isCard: false,
  chartKey: "vehicle-price-range-chart"
};

const mapStateToProps = state => {
  const { financeType } = state;
  const item = financeType.item || {};

  return {
    step: item.stepCashValue
  };
};

export default connect(mapStateToProps)(VehiclePriceRangeSlider);