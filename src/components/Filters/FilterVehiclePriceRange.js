import React, { Component } from "react";
//import VehiclePriceRangeSlider from "../Sliders/VehiclePriceRangeSlider";
import { EuroFormat } from "../Helpers/valuesFormatters";

export class FilterVehiclePriceRange extends Component {
  filterTitleFormat(currentValue) {
    if (currentValue instanceof Array) {
      var newValue = EuroFormat(currentValue[0]);

      var newValue2 = EuroFormat(currentValue[1]);

      return <>{"Entre: " + newValue + " - " + newValue2}</>;
    } else {
      var newValue = EuroFormat(currentValue);

      return <>{"Valor: " + newValue}</>;
    }
  }

  render() {
    return (<div></div>
      // <VehiclePriceRangeSlider
      //   titleFormat={this.filterTitleFormat}
      //   subTitle={"Valor que pretende gastar"}
      //   showValues={false}
      //   {...this.props}
      //   defaultValue={[15000, 75000]}
      // />
    );
  }
}

export default FilterVehiclePriceRange;
