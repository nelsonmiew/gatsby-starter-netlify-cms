import React, { Component } from "react";
import loadable from "@loadable/component";
import propTypes from "prop-types";
// import RangeSlider from "../FormComponents/RangeSlider";

const RangeSlider = loadable(() => import("components/FormComponents/RangeSlider"));

export class FilterSlider extends Component {
  preventDefaultHangleClear = (e) => {
    e.preventDefault();
    const { filterClearButtonHandle } = this.props;
    if (filterClearButtonHandle) filterClearButtonHandle();
  }

  render() {
    const {
      filterTitle,
      filterSubTitle,
      filterTitleFormat,
      filterSubTitleFormat,
      filterClearButtonHandle,
      filterClearButtonText,
      value,
      defaultValue
    } = this.props;

    return (
      <div className="filter">
        <div className="d-flex mb-adapt-4">
          <div className="flex-grow-1">
            {(filterTitle || filterTitleFormat) &&
              <h5 className={"h5 font-weight-bold filter-title mb-0"}>
                {filterTitleFormat ? <>{filterTitleFormat()}</> : <>{filterTitle}</>}
              </h5>}
            {(filterSubTitle || filterSubTitleFormat) &&
              <h6 className={"h6 text-light-grey text-filter-subtitle mb-0"}>
                {filterSubTitleFormat ? <>{filterSubTitleFormat()}</> : <>{filterSubTitle}</>}
              </h6>}
          </div>
          <div className="flex-shrink-1">
            {filterClearButtonHandle && (
              <a href="#" className={"clear-button " + (value !== defaultValue ? "changed" : "")} onClick={this.preventDefaultHangleClear}>
                {filterClearButtonText || "Clear"}
              </a>
            )}
          </div>
        </div>
        <RangeSlider {...this.props} />
      </div>
    );
  }
}

FilterSlider.defaultProps = {
  chartHeight: 40
};

FilterSlider.propTypes = {
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
  chartStrict: propTypes.bool,
  chartHeight: propTypes.number,
  //filter
  filterTitle: propTypes.string,
  filterSubTitle: propTypes.string,
  filterTitleFormat: propTypes.func,
  filterSubTitleFormat: propTypes.func,
  filterClearButtonHandle: propTypes.func,
  filterClearButtonText: propTypes.string
};

export default FilterSlider;
