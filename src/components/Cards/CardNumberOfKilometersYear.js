import React, { Component } from "react";
import NumberOfKilometersYearSlider from "../Sliders/NumberOfKilometersYearSlider";

export class CardNumberOfKilometersYear extends Component {
  filterTitleFormat(currentValue) {
    const postfix = "KM";

    var newValue = currentValue.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newValue.join(",");

    return <>{newValue + postfix}</>;
  }

  render() {
    return (
      <NumberOfKilometersYearSlider
        titleFormat={this.filterTitleFormat}
        subTitle={"Quilometragem total do contrato"}
        showValues={false}
        isCard={true}
        {...this.props}
      />
    );
  }
}

export default CardNumberOfKilometersYear;
