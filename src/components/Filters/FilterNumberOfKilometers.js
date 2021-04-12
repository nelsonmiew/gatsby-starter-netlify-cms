import React, { Component } from "react";
import NumberOfKilometersSlider from "../Sliders/NumberOfKilometersSlider";

export class FilterNumberOfKilometers extends Component {
  filterTitleFormat(currentValue) {
    const postfix = "KM";

    var newValue = currentValue.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newValue.join(",");

    return <>{newValue + postfix}</>;
  }

  render() {
    return <NumberOfKilometersSlider titleFormat={this.filterTitleFormat} subTitle={"Km da minha viatura"} showValues={false} {...this.props} />;
  }
}

export default FilterNumberOfKilometers;
