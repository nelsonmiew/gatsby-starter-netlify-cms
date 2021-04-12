import React, { Component } from "react";
import MonthlyRentRangeSlider from "../Sliders/MonthlyRentRangeSlider";

export class FilterMonthlyRentRange extends Component {
  constructor(props) {
    super(props);

    this.filterSubTitleFormat = this.filterSubTitleFormat.bind(this);
  }

  filterTitleFormat(currentValue) {
    const postfix = "€";

    if (currentValue instanceof Array) {
      var newValue = currentValue[0].toString().split(".");
      newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      newValue.join(",");

      var newValue2 = currentValue[1].toString().split(".");
      newValue2[0] = newValue2[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      newValue2.join(",");

      return <>{newValue + postfix + " - " + (currentValue[1] > 1000 ? "1000+ " : newValue2) + postfix + "/Mês"}</>;
    }

    return <>{"Valor: " + currentValue + postfix}</>;
  }

  filterSubTitleFormat() {
    if (this.props.priceAverage) {
      return <>{"Preço médio: " + this.props.priceAverage + "€"}</>;
    }

    return <>{"Selecione mediante o seu perfil"}</>;  }

  render() {
    return (
      <MonthlyRentRangeSlider
        titleFormat={this.filterTitleFormat}
        subTitleFormat={this.filterSubTitleFormat}
        showValues={false}
        {...this.props}
      />
    );
  }
}

export default FilterMonthlyRentRange;
