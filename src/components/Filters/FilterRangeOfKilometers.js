import React, { Component } from "react";
import KilometersRangeSlider from "../Sliders/KilometersRangeSlider";
import { KmFormat } from "../Helpers/valuesFormatters";

export class FilterRangeOfKilometers extends Component {
  filterTitleFormat(currentValue) {
    if (currentValue instanceof Array) {
      return <>{KmFormat(currentValue[0]) + " - " + KmFormat(currentValue[1])}</>;
    }

    return <>{"Valor: " + currentValue}</>;
  }

  render() {
    return <KilometersRangeSlider titleFormat={this.filterTitleFormat} showValues={false} {...this.props} />;
  }
}

export default FilterRangeOfKilometers;
