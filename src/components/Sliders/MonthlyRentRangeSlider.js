import React, { Component } from "react";
import { connect } from "react-redux";
import ChartSlider from "./ChartSlider";

export class MonthlyRentRangeSlider extends Component {
  render() {
    //console.log('step ==>', this.props.step)
    return <ChartSlider {...this.props} />;
  }
}

MonthlyRentRangeSlider.defaultProps = {
  min: 0,
  max: 600,
  step: 20,
  defaultValue: [0, 300],
  prefix: "",
  postfix: "€",
  chartStrict: false,
  isCard: false,
  chartKey: "monthly-range-chart"
};

const mapStateToProps = state => {
  const { financeType } = state;
  const item = financeType.item || {};

  return {
    step: item.stepMonthlyRent
  };
};

export default connect(mapStateToProps)(MonthlyRentRangeSlider);
