import React, { Component } from "react";
import { connect } from "react-redux";
import ChartSlider from "./ChartSlider";

export class InitialDepositSlider extends Component {
  render() {
    return <ChartSlider {...this.props} />;
  }
}

InitialDepositSlider.defaultProps = {
  min: 0,
  max: 25000,
  step: 250,
  defaultValue: 3000,
  prefix: "",
  postfix: "€",
  chartStrict: true,
  isCard: false,
  chartKey: "initial-deposit-chart"
};

const mapStateToProps = state => {
  const { financeType } = state;
  const item = financeType.item || {};

  return {
    step: item.stepInitialValue,
    max: item.catalogMaxInitialValue,
    defaultValue: item.catalogDefaultInitialValue
  };
};

export default connect(mapStateToProps)(InitialDepositSlider);
