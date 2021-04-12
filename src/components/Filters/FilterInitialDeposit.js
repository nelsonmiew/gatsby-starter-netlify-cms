import React, { Component } from "react";
import InitialDepositSlider from "../Sliders/InitialDepositSlider";

export class FilterInitialDeposit extends Component {
  filterTitleFormat(currentValue) {
    const postfix = "€";

    var newValue = currentValue.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newValue.join(",");

    return <>{newValue + postfix}</>;
  }

  render() {
    return <InitialDepositSlider titleFormat={this.filterTitleFormat} subTitle={"Valor de entrada inicial"} showValues={false} {...this.props} />;
  }
}

export default FilterInitialDeposit;
