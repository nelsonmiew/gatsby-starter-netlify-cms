import React, { Component } from "react";
import RecoveryValueSlider from "../Sliders/RecoveryValueSlider";

export class CardRecoveryValue extends Component {
  cardTitleFormat(currentValue) {
    const postfix = "€";

    var newValue = currentValue.toString().split(".");
    newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    newValue.join(",");
    
    return <>{"Valor: " + newValue + postfix}</>;
  }

  render() {
    return (
      <RecoveryValueSlider
        isCard={true}
        titleFormat={this.cardTitleFormat}
        subTitle={"Selecione mediante o seu perfil"}
        showValues={false}
        {...this.props}
      />
    );
  }
}

export default CardRecoveryValue;
