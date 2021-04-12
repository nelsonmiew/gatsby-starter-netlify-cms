import React, { Component } from "react";
import { connect } from "react-redux";
import ChartSlider from "./ChartSlider";

export class NumberOfKilometersYearSlider extends Component {
  render() {
    return (
      <ChartSlider {...this.props} />
    );
  }
}

NumberOfKilometersYearSlider.defaultProps = {
  min: 20000,
  max: 200000,
  step: 10000,
  defaultValue: 20000,
  prefix: "",
  postfix: "km",
  isCard: false
};

const mapStateToProps = state => {
  //const { financeType } = state;
 // const item = financeType.item || {};

  return {
    //step: item.stepAnnualMileage
  };
};

export default connect(mapStateToProps)(NumberOfKilometersYearSlider);