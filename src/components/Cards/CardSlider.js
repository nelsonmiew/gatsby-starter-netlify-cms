import React, { Component } from "react";
import loadable from "@loadable/component";
import propTypes from "prop-types";
//import RangeSlider from "components/FormComponents/RangeSlider";

const RangeSlider = loadable(() => import("src/components/FormComponents/RangeSlider"));

export class CardSlider extends Component {
  preventDefaultHangleClear = (e) => {
    e.preventDefault();
    const { cardClearButtonHandle } = this.props;
    if (cardClearButtonHandle) cardClearButtonHandle();
  }

  render() {
    const {
      cardTitle,
      cardSubTitle,
      cardTitleFormat,
      cardSubTitleFormat,
      cardClearButtonHandle,
      cardClearButtonText,
      value,
      defaultValue
    } = this.props;
    
    return (
      <div className="card card-slider">
        <div className="card-body">
          <div className="d-flex mb-adapt-4">
            <div className="flex-grow-1">
              <h5 className={"h5 font-weight-bold card-title mb-0"}>
                {cardTitleFormat ? (
                  <>{cardTitleFormat()}</>
                ) : (
                    <>{cardTitle}</>
                  )}
              </h5>
              <h6 className={"h6 text-light-grey text-card-subtitle mb-0"}>
                {cardSubTitleFormat ? (
                  <>{cardSubTitleFormat()}</>
                ) : (
                    <>{cardSubTitle}</>
                  )}
              </h6>
            </div>
            <div className="flex-shrink-1">
              {cardClearButtonHandle && <a href="#" className={"clear-button " + (value !== defaultValue ? "changed" : "")} onClick={this.preventDefaultHangleClear}>{cardClearButtonText || 'Clear'}</a>}
            </div>
          </div>
          <RangeSlider {...this.props} />
        </div>
      </div>
    );
  }
}

CardSlider.defaultProps = {
  chartHeight: 80
}

CardSlider.propTypes = {
  //slider
  min: propTypes.number,
  max: propTypes.number,
  step: propTypes.number,
  start: propTypes.oneOfType([propTypes.array, propTypes.number]),
  prefix: propTypes.string,
  postfix: propTypes.string,
  value: propTypes.oneOfType([propTypes.array, propTypes.number]),
  defaultValue: propTypes.oneOfType([propTypes.array, propTypes.number]),
  onChangeValues: propTypes.func,
  onAfterChange: propTypes.func,
  showValues: propTypes.bool,
  //chart
  chartKey: propTypes.string,
  chartBars: propTypes.bool,
  chartData: propTypes.array,
  chartDataTotalKey: propTypes.string,
  chartDataValueKey: propTypes.string,
  chartTooltip: propTypes.bool,
  chartStrict: propTypes.bool,
  chartOffsetColor: propTypes.string,
  chartColor: propTypes.string,
  chartHeight: propTypes.number,
  //card
  cardTitle: propTypes.string,
  cardSubTitle: propTypes.string,
  cardTitleFormat: propTypes.func,
  cardSubTitleFormat: propTypes.func,
  cardClearButtonHandle: propTypes.func,
  cardClearButtonText: propTypes.string
};

export default CardSlider;
