import React, { Component } from "react";
import MonthlyRentSlider from "../Sliders/MonthlyRentSlider";

export class CardMonthlyRent extends Component {
  cardTitleFormat(currentValue) {
    const postfix = "€";
    
    var newValue = currentValue.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newValue.join(",");

    return <>{"Valor: " + newValue + postfix + "/Mês"}</>;
  }

  render() {
    return (
      <MonthlyRentSlider
        isCard={true}
        titleFormat={this.cardTitleFormat}
        subTitle={"Selecione mediante o seu perfil"}
        {...this.props}
      />
    );
  }
}

export default CardMonthlyRent;
