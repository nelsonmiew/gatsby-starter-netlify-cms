import React, { Component } from "react";
 import NumberOfMonthsSlider from "../Sliders/NumberOfMonthsSlider";

export class FilterNumberOfMonths extends Component {
  filterTitleFormat(currentValue) {
    const postfix = " MESES";
    return <>{currentValue + postfix}</>;
  }

  render() {
    
    return <NumberOfMonthsSlider titleFormat={this.filterTitleFormat} subTitle={"Mensalidades"} showValues={false} {...this.props} />;
  }
}

export default FilterNumberOfMonths;
