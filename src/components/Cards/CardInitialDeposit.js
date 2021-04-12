import React, { Component } from "react";
import InitialDepositSlider from "../Sliders/InitialDepositSlider";

export class CardInitialDeposit extends Component {
  cardTitleFormat(currentValue) {
    const postfix = "€";

    var newValue = currentValue.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newValue.join(",");
    
    return <>{"Valor: " + newValue + postfix}</>;
  }

  render() {
    return (
      <InitialDepositSlider
        isCard={true}
        titleFormat={this.cardTitleFormat}
        subTitle={"Selecione mediante o seu perfil"}
        showValues={false}
        {...this.props}
      />
    );
  }
}

export default CardInitialDeposit;
