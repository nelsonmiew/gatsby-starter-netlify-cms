import React, { Component } from "react";
import PropTypes from "prop-types";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = { ratingValue: 2 };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ ratingValue: value });
  }

  setValue = v => {
    const { onSetValue, onChange } = this.props;
    this.setState({ ratingValue: v });

    if (onSetValue) onSetValue(v);
    if (onChange) onChange(v);
  };

  render() {
    const { ratingValue } = this.state;
    const { value } = this.props;
    const valueToUse = value || ratingValue;
    return (
      <div className="rating-block">
        {[...Array(5)].map((r, k) => (
          <span
            key={"rating-" + k}
            className={"fa fa-star " + (valueToUse >= k ? "checked" : "")}
            role="button"
            onClick={() => {
              this.setValue(k);
            }}
          ></span>
        ))}
      </div>
    );
  }
}

Rating.propTypes = {
  onSetValue: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Rating;
