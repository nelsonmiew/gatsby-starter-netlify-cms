import React, { Component, Fragment } from "react";
import { CheckboxField } from "../FormComponents/ReduxFormFields/CheckboxField";
import { UncontrolledTooltip } from "reactstrap";

export class FilterColorTypes extends Component {
  render() {
    const { colorTypes } = this.props;

    return (
      <>
        {colorTypes &&
          colorTypes.map((x, i) => (
            <Fragment key={(this.props.key || "color-types") + "-" + i}>
              <CheckboxField
                id={(this.props.id || "color-types") + "-" + i}
                name={this.props.name + "[" + x.id + "]"}
                className={"color-picker"}
                label={<div className="color-pick" style={{ background: x.code }}></div>}
              />
              <UncontrolledTooltip className="listing_small" target={(this.props.id || "color-types") + "-" + i}>
                {x.name.toLowerCase()}
                {(x.quantity || x.quantity === 0) && <span className="text-muted ml-1">{"("+x.quantity+")"}</span>}
              </UncontrolledTooltip>
            </Fragment>
          ))}
      </>
    );
  }
}

export default FilterColorTypes;
