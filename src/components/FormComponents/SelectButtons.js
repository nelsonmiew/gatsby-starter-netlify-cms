import React, { Fragment } from "react";
import { Label } from "reactstrap";

export const SelectButtons = props => {
  const value = props.value;
  const labelMd = props.labelMd || 4;
  // let labelExtraClass = " " + (props.labelExtraClass || (labelMd >= 6 && "w-50") || "");
  //linha abaixo não é engano. relaciono o tamanho doo input com o da label
  const htmlName = props.name;

  const setValue = props.onChange || props.onSetValue || ((x, y) => true);
  const label = props.label;
  const options = props.options || [];

  return (
    <Fragment>
      {label && label !== "" && (
        <Label className={"d-inline-block texts text-medium w-100"} htmlFor={htmlName}>
          {label}
        </Label>
      )}
      <div className="btn-group" data-toggle="buttons">
        {options && options.map((o, i) => (
          <button
            key={htmlName + "_" + i}
            type="button"
            className={
              "" + (o.value === value ? " active" : "")
            }
            onClick={() => {
              setValue(o.value);
            }}
            disabled={o.disabled}
          >
            {o.label}
            {o.disabled && <><br /><span className="text-mutted small">brevemente</span></>}
          </button>
        ))}
      </div>
    </Fragment>
  );
};

export default SelectButtons;
