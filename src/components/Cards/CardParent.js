import React, { Component } from "react";
import propTypes from "prop-types";
import { Collapse } from "reactstrap";
import { SwitchField } from "../FormComponents/ReduxFormFields/SwitchField";

export class CardParent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: this.props.collapse || false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { id, name, children, title, description, vkey, toggle, extraClass } = this.props;
    return (
      <div id={id} className={"card card-body bg-pale-grey border-0 "+extraClass}>
        {title && (
          <div className="card-title mb-0 d-flex align-items-center pb-3">
            {toggle ? (
              <SwitchField
                name={name || vkey}
                label={title}
                key={"switchToggler" + vkey}
                id={"switchToggler" + vkey}
                description={description}
                onChange={this.toggle}
                className={"h3 font-weight-normal"}
              />
            ) : (
                <span className="d-block h3 font-weight-normal">{title}</span>
            )}
          </div>
        )}
        {description && (
          <div className="row mb-3">
            <div className="col-12">
              <span className="d-block h5">{description}</span>
            </div>
          </div>
        )}
        {toggle ? (
          <Collapse key={"collapse-" + vkey} isOpen={this.state.collapse}>
            <>{children}</>
          </Collapse>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  }
}

CardParent.defaultProps = {
  toggle: false
};

CardParent.propTypes = {
  toggle: propTypes.bool,
  vkey: propTypes.string,
  children: propTypes.node.isRequired
};

export default CardParent;
