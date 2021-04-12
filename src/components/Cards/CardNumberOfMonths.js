import React, { Component } from "react";
import NumberOfMonthsSlider from "../Sliders/NumberOfMonthsSlider";

export class CardNumberOfMonths extends Component {
  filterTitleFormat(currentValue) {
    const postfix = " MESES";
    return <>{currentValue + postfix}</>;
  }
  render() {
    return <NumberOfMonthsSlider titleFormat={this.filterTitleFormat} subTitle={"Mensalidades"} showValues={false} isCard={true} {...this.props} />;
  }
}

export default CardNumberOfMonths;
