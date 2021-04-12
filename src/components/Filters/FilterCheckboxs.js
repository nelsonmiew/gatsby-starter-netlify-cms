import React, { Component } from "react";
import { CheckboxField } from "../FormComponents/ReduxFormFields/CheckboxField";

export class FilterCheckboxs extends Component {
  render() {
    const { options } = this.props;

    return (
      <>
        {options &&
          options.map((x, i) => (
            <CheckboxField
              key={this.props.name + "-" + i}
              id={this.props.name + "-" + i}
              name={this.props.name + "[" + x.id + "]"}
              className="d-block texts mt-adapt-1 mb-adapt-1"
              label={
                <>
                  {x.name}
                  {(x.quantity || x.quantity === 0) && (
                    <span className="text-muted ml-1">{"(" + x.quantity + ")"}</span>
                  )}
                </>
              }
            />
          ))}
      </>
    );
  }
}

export default FilterCheckboxs;
