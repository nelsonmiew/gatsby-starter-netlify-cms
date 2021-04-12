import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from "recharts";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const Handle = Slider.Handle;

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderLength: 0,
      sliderStart: 0
    };

    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onAfterChangeSlider = this.onAfterChangeSlider.bind(this);
  }

  componentDidMount() {
    if (!this.slider) {
      return;
    }

    const { start } = this.props;
    const sliderLength = this.slider["offsetWidth"];
    const sliderStart = this.slider["offsetLeft"];

    this.setState({ sliderLength, sliderStart, currentValue: start });
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.onChangeSlider(value);
    }
  }

  handle = props => {
    const { prefix, postfix } = this.props;
    const { value, dragging, index, ...restProps } = props;
    const { currentValue } = this.state;
    const myValue = currentValue instanceof Array ? currentValue[index] : currentValue;

    return (
      <Handle key={"slider-handle-" + index} value={myValue} {...restProps}>
        <span className="slider-value listing_text">
          {prefix}
          {myValue}
          {postfix}
        </span>
      </Handle>
    );
  };

  onChangeSlider(value) {
    const { onChangeValues } = this.props;

    if (onChangeValues) {
      onChangeValues(value);
    }

    this.setState({ currentValue: value });
  }

  onAfterChangeSlider(value) {
    const { onAfterChange, min, max } = this.props;

    if (onAfterChange) {
      if (!(value instanceof Array)) {
        onAfterChange(value > max ? max : value < min ? min : value);
        this.setState({ currentValue: value > max ? max : value < min ? min : value });
      } else {
        onAfterChange(value);
      }
    }
  }

  render() {
    const {
      prefix,
      postfix,
      chartStrict,
      chartHeight,
      start,
      step,
      showValues,
      chartKey,
      chartBars,
      chartData,
      chartDataValueKey,
      chartDataTotalKey,
      chartOffsetColor,
      chartColor
    } = this.props;

    const { sliderLength } = this.state;
    const min = chartData && chartData.length > 1 ? chartData[0].v - step : this.props.min;
    const max = chartData && chartData.length > 1 ? chartData[chartData.length - 1].v : this.props.max;

    const currentValue =
      chartData &&
        chartData.length > 1 &&
        this.state.currentValue instanceof Array &&
        (this.state.currentValue[0] < chartData[0].v - step ||
          this.state.currentValue[0] > chartData[chartData.length - 1].v ||
          this.state.currentValue[1] < chartData[0].v ||
          this.state.currentValue[1] > chartData[chartData.length - 1].v)
        ? start
        : this.state.currentValue;

    const getInitialOffset = () => {
      if (currentValue instanceof Array) {
        return parseFloat((currentValue[0] - min) / (max - min)).toFixed(2);
      }

      return parseFloat((currentValue - min) / (max - min)).toFixed(2);
    };

    const getEndOffset = () => {
      if (currentValue instanceof Array) {
        return parseFloat((currentValue[1] - min) / (max - min)).toFixed(2);
      }

      return parseFloat((currentValue - min) / (max - min)).toFixed(2);
    };

    const initialOffset = getInitialOffset();
    const endOffset = getEndOffset();

    const maxLimit = currentValue instanceof Array ? max : Math.ceil(max / step) * step;
    const minLimit =
      currentValue instanceof Array ? min : min % step === 0 ? min : Math.round((min - step / 2) / step) * step;

    return (
      <div
        className={"range-slider" + (!chartData || chartData.length === 0 ? " range-slider-without-chart" : "")}
        ref={slider => (this.slider = slider)}
      >
        {chartData && chartData.length > 0 && chartData[0][chartDataValueKey] ? (
          <section className="slider-chart">
            {chartBars ? (
              <ResponsiveContainer minWidth="100%" width="100%" height={chartHeight}>
                <BarChart
                  key={chartKey}
                  data={chartData}
                  width={sliderLength}
                  height={chartHeight}
                  barGap={1}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Bar dataKey={chartDataTotalKey} strokeWidth={0}>
                    {chartData.map((entry, i) =>
                      start instanceof Array ? (
                        <Cell
                          key={"chart-cell-" + i}
                          fill={
                            chartData[i][chartDataValueKey] < currentValue[0] ||
                              chartData[i][chartDataValueKey] >= currentValue[1]
                              ? chartColor
                              : chartOffsetColor
                          }
                        />
                      ) : (
                          <Cell
                            key={"bar-cell-" + i}
                            fill={chartData[i][chartDataValueKey] < currentValue ? chartColor : chartOffsetColor}
                          />
                        )
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <ResponsiveContainer minWidth="100%" width="100%" height={chartHeight}>
                  <AreaChart
                    key={chartKey}
                    data={chartData}
                    width={sliderLength}
                    height={chartHeight}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id={chartKey + "-splitColor"}>
                        {currentValue instanceof Array ? (
                          <Fragment>
                            {!chartStrict && <stop offset={initialOffset} stopColor={chartOffsetColor} />}
                            <stop offset={initialOffset} stopColor={chartColor} />
                            <stop offset={endOffset} stopColor={chartColor} />
                            {!chartStrict && <stop offset={endOffset} stopColor={chartOffsetColor} />}
                          </Fragment>
                        ) : (
                            <Fragment>
                              <stop offset={initialOffset} stopColor={chartColor} />
                              <stop offset={endOffset} stopColor={chartStrict ? "#FFFFFF" : chartOffsetColor} />
                            </Fragment>
                          )}
                      </linearGradient>
                    </defs>
                    <Area
                      strokeWidth={0}
                      type="monotone"
                      dataKey={chartDataTotalKey}
                      fill={"url(#" + chartKey + "-splitColor)"}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
          </section>
        ) : (
            <section style={{ height: chartHeight }} />
          )}
        <section className="slider-container">
          {start instanceof Array ? (
            <Range
              min={minLimit}
              max={maxLimit}
              step={step}
              defaultValue={start}
              value={currentValue}
              onAfterChange={this.onAfterChangeSlider}
              onChange={this.onChangeSlider}
              handle={showValues ? this.handle : undefined}
              prefix={prefix}
              postfix={postfix}
              allowCross={false}
              pushable={step * 2}
            />
          ) : (
              <Slider
                min={minLimit}
                max={maxLimit}
                step={step}
                defaultValue={start}
                value={currentValue}
                onAfterChange={this.onAfterChangeSlider}
                onChange={this.onChangeSlider}
                handle={showValues ? this.handle : undefined}
                prefix={prefix}
                postfix={postfix}
              />
            )}
        </section>
      </div>
    );
  }
}

RangeSlider.defaultProps = {
  //slider
  min: 0,
  max: 100,
  step: 1,
  start: 50,
  prefix: "",
  postfix: "",
  tooltip: "always",
  labels: [],
  showValues: true,
  //chart
  chartBars: false,
  chartData: [],
  chartDataTotalKey: "",
  chartDataValueKey: "",
  chartTooltip: false,
  chartStrict: false,
  chartOffsetColor: "#EEF2FD",
  chartColor: "#D2D9EC",
  chartHeight: 80
};

RangeSlider.propTypes = {
  //slider
  min: propTypes.number,
  max: propTypes.number,
  step: propTypes.number,
  start: propTypes.oneOfType([propTypes.array, propTypes.number]),
  prefix: propTypes.string,
  postfix: propTypes.string,
  value: propTypes.oneOfType([propTypes.array, propTypes.number]),
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
  chartHeight: propTypes.number
};

export default RangeSlider;
