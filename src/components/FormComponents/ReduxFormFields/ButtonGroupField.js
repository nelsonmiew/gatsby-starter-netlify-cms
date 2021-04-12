import React from "react";
import { Field } from "redux-form";
import { ButtonGroup } from "reactstrap";
import { renderButtonGroup } from "../ReduxFormRenders/InputsRenders";

export const ButtonGroupField = (props) => {
  
  return props.options ? (
    <ButtonGroup>
      {props.options.map((o, i) => (
        <Field
          id={"bopt-" + o.value}
          key={"bopt-" + o.value + "-" + i}
          name={props.name}
          component={renderButtonGroup} 
          label={o.label}
          valueToSet={o.value}
          value={o.value}
          disabled={o.disabled}
          op_paymentTypeSelected={props.op_paymentTypeSelected}
          {...props}
        />
      ))}
    </ButtonGroup>
  ) : (
    <></>
  );
};

export default { ButtonGroupField };
