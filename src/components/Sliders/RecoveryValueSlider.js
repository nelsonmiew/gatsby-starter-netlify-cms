import React, { Component } from "react";
import { connect } from "react-redux";
import ChartSlider from "./ChartSlider";

export class RecoveryValueSlider extends Component {
  render() {
    return <ChartSlider {...this.props} />;
  }
}

RecoveryValueSlider.defaultProps = {
  min: 250,
  max: 25000,
  step: 250,
  defaultValue: 3000,
  prefix: "",
  postfix: "€",
  chartStrict: true,
  isCard: false,
  chartKey: "recovery-value-chart"
};

const mapStateToProps = state => {
  const { financeType } = state;
  const item = financeType.item || {};

  return {
    step: item.stepRecoveryValue
  };
};

export default connect(mapStateToProps)(RecoveryValueSlider);
