/*eslint eqeqeq: "off"*/

import React, { Component } from "react";
import propTypes from "prop-types";
import CardSlider from "../Cards/CardSlider";
import FilterSlider from "../Filters/FilterSlider";

export class ChartSlider extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newValue: [1, 10],
      currentValue: [1, 10]
    };

    this.updateData = this.updateData.bind(this);
    this.changeData = this.changeData.bind(this);
    this.clearCardValues = this.clearCardValues.bind(this);
  }

  componentDidMount() {
    const { defaultValue, value } = this.props;
    this.updateData(value === 0 ? 0 : value || defaultValue);
    this.changeData(value === 0 ? 0 : value || defaultValue);
  }

  componentDidUpdate(prevProps) {
    const { chartData, defaultValue, value } = this.props;
    if (prevProps.chartData != chartData) {
      this.updateData(value === 0 ? 0 : value || defaultValue);
      this.changeData(value === 0 ? 0 : value || defaultValue);
    }
  }

  updateData(value) {
    const { onChange } = this.props;
    if (onChange) onChange(value);

    let currentStartValue = 0;
    let currentEndValue = 0;

    if (value instanceof Array && value.length > 0) {
      currentStartValue = value[0];
      currentEndValue = value[1];
    } else {
      currentStartValue = value;
      currentEndValue = value;
    }

    this.setState({
      newValue: value instanceof Array ? [currentStartValue, currentEndValue] : currentStartValue
    });
  }

  changeData(value) {
    let currentStartValue = 0;
    let currentEndValue = 0;

    if (value instanceof Array && value.length > 0) {
      currentStartValue = value[0];
      currentEndValue = value[1];
    } else {
      currentStartValue = value;
      currentEndValue = value;
    }

    this.setState({
      currentValue: value instanceof Array ? [currentStartValue, currentEndValue] : currentStartValue
    });
  }

  clearCardValues() {
    const { defaultValue } = this.props;

    this.setState({ newValue: defaultValue });
    this.updateData(defaultValue);
  }

  render() {
    const { newValue, currentValue } = this.state;

    const {
      min,
      max,
      chartKey,
      chartData,
      isCard,
      step,
      defaultValue,
      prefix,
      postfix,
      showValues,
      chartStrict,
      value,
      title,
      subTitle,
      titleFormat,
      subTitleFormat,
      clearButtonText,
      clearButtonHandle
    } = this.props;

    return (
      <>
        {chartData && chartData.length > 0 ? (
          isCard ? (
            <CardSlider
              //slider
              min={min}
              max={max}
              step={step}
              start={value === 0 ? 0 : value || defaultValue}
              value={value || newValue}
              defaultValue={defaultValue}
              prefix={prefix}
              postfix={postfix}
              onAfterChange={this.updateData}
              onChangeValues={this.changeData}
              showValues={showValues}
              //chart
              chartKey={chartKey}
              chartBars={false}
              chartStrict={chartStrict}
              chartData={chartData}
              chartDataValueKey={"v"}
              chartDataTotalKey={"t"}
              //card
              cardTitle={title}
              cardSubTitle={subTitle}
              cardTitleFormat={titleFormat ? () => titleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
              cardSubTitleFormat={subTitleFormat ? () => subTitleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
              cardClearButtonHandle={clearButtonHandle || this.clearCardValues}
              cardClearButtonText={clearButtonText || "Limpar"}
            />
          ) : (
              <FilterSlider
                //slider
                min={min}
                max={max}
                step={step}
                start={value === 0 ? 0 : value || defaultValue}
                value={value || newValue}
                defaultValue={defaultValue}
                prefix={prefix}
                postfix={postfix}
                onAfterChange={this.updateData}
                onChangeValues={this.changeData}
                showValues={showValues}
                //chart
                chartKey={chartKey}
                chartBars={false}
                chartStrict={chartStrict}
                chartData={chartData}
                chartDataValueKey={"v"}
                chartDataTotalKey={"t"}
                //filter
                filterTitle={title}
                filterSubTitle={subTitle}
                filterTitleFormat={titleFormat ? () => titleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
                filterSubTitleFormat={
                  subTitleFormat ? () => subTitleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null
                }
                filterClearButtonHandle={clearButtonHandle || this.clearCardValues}
                filterClearButtonText={clearButtonText || "Limpar"}
              />
            )
        ) : isCard ? (
          <CardSlider
            //slider
            min={min}
            max={max}
            step={step}
            start={value === 0 ? 0 : value || defaultValue}
            value={value || newValue}
            defaultValue={defaultValue}
            prefix={prefix}
            postfix={postfix}
            onAfterChange={this.updateData}
            onChangeValues={this.changeData}
            showValues={showValues}
            //card
            cardTitle={title}
            cardSubTitle={subTitle}
            cardTitleFormat={titleFormat ? () => titleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
            cardSubTitleFormat={subTitleFormat ? () => subTitleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
            cardClearButtonHandle={clearButtonHandle || this.clearCardValues}
            cardClearButtonText={clearButtonText || "Limpar"}
          />
        ) : (
              <FilterSlider
                //slider
                min={min}
                max={max}
                step={step}
                start={value === 0 ? 0 : value || defaultValue}
                value={value || newValue}
                defaultValue={defaultValue}
                prefix={prefix}
                postfix={postfix}
                onAfterChange={this.updateData}
                onChangeValues={this.changeData}
                showValues={showValues}
                //filter
                filterTitle={title}
                filterSubTitle={subTitle}
                filterTitleFormat={titleFormat ? () => titleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
                filterSubTitleFormat={subTitleFormat ? () => subTitleFormat(currentValue === 0 ? 0 : currentValue || defaultValue) : null}
                filterClearButtonHandle={clearButtonHandle || this.clearCardValues}
                filterClearButtonText={clearButtonText || "Limpar"}
              />
            )}
      </>
    );
  }
}

ChartSlider.defaultProps = {
  min: 1,
  max: 10,
  step: 1,
  defaultValue: [2, 8],
  prefix: "",
  postfix: "",
  chartStrict: false,
  isCard: false
};

ChartSlider.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
  step: propTypes.number,
  value: propTypes.oneOfType([propTypes.array, propTypes.number]),
  defaultValue: propTypes.oneOfType([propTypes.array, propTypes.number]),
  prefix: propTypes.string,
  postfix: propTypes.string,
  onChange: propTypes.func,
  showValues: propTypes.bool,
  //chart
  chartKey: propTypes.string,
  chartStrict: propTypes.bool,
  chartData: propTypes.array,
  //card
  isCard: propTypes.bool,
  title: propTypes.string,
  subTitle: propTypes.string,
  titleFormat: propTypes.func,
  subTitleFormat: propTypes.func,
  clearButtonHandle: propTypes.func,
  clearButtonText: propTypes.string
};

export default ChartSlider;
