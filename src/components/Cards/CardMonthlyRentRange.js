import React, { Component } from "react";
import MonthlyRentRangeSlider from "../Sliders/MonthlyRentRangeSlider";

export class CardMonthlyRentRange extends Component {
  constructor(props) {
    super(props);
    this.cardSubTitleFormat = this.cardSubTitleFormat.bind(this);
  }

  cardTitleFormat(currentValue) {
    const postfix = "€";

    if (currentValue instanceof Array) {
      const newValue = currentValue[0].toString().split(".");
      newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      newValue.join(",");

      const newValue2 = currentValue[1].toString().split(".");
      newValue2[0] = newValue2[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      newValue2.join(",");

      return <>{"Entre: " + newValue + postfix + " - " + (currentValue[1] > 1000 ? "1000+ " : newValue2) + postfix + "/Mês"}</>;
    } else {
      const newValue = currentValue.toString().split(".");
      newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      newValue.join(",");

      return <>{"Valor: " + newValue + postfix}</>;
    }
  }

  cardSubTitleFormat() {
    if (this.props.priceAverage) {
      return <>{"Preço médio: " + this.props.priceAverage + "€"}</>;
    }

    return <>{"Selecione mediante o seu perfil"}</>;
  }

  render() {
    return (
      <MonthlyRentRangeSlider
        isCard={true}
        titleFormat={this.cardTitleFormat}
        subTitleFormat={this.cardSubTitleFormat}
        showValues={false}
        {...this.props}
      />
    );
  }
}

export default CardMonthlyRentRange;
