import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormText} from 'reactstrap';

class TextInput extends Component {
  render() {
    const { invalid, error, warning } = this.props;
    return (
      <div className="form-group">
        <input
          type={this.props.type ? this.props.type : 'text'}
          className={"form-control" + (this.props.value ? ' filled' : '')}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        />
        {this.props.label && (
          <label htmlFor={this.props.name}>{this.props.label}</label>
        )}
        {invalid && <FormFeedback>{error}</FormFeedback>}
        {!invalid && warning && <FormText>{warning}</FormText>}
      </div>
    );
  }
}

TextInput.propTypes = {
  //label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextInput;