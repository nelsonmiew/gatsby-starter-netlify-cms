import React, { Component } from "react";
import VehiclePriceRangeSlider from "../Sliders/VehiclePriceRangeSlider";

export class CardVehiclePriceRange extends Component {
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

      return <>{"Entre: " + newValue + postfix + " - " + newValue2 + postfix}</>;
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

    return <>{"Selecione mediante o seu perfil"}</>;  }

  render() {
    return (
      <VehiclePriceRangeSlider
        isCard={true}
        titleFormat={this.cardTitleFormat}
        subTitleFormat={this.cardSubTitleFormat}
        showValues={false}
        {...this.props}
      />
    );
  }
}

export default CardVehiclePriceRange;
