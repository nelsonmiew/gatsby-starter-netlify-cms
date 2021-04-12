import React from "react";
import { Field } from "redux-form";
import { renderRadio } from "../ReduxFormRenders/InputsRenders";

export const RadioButtonsField = props => {
  return props.options ? (
    props.options.map((o, i) => (
      <div key={"opt-cont-" + o.value + "-" + i} className={props.className || ""}>
        <Field
          id={"opt-" + o.value}
          key={"opt-" + o.value + "-" + i}
          name={props.name}
          component={renderRadio}
          label={o.label}
          valueToSet={o.value}
          value={o.value}
          {...props}
        />
      </div>
    ))
  ) : (
    <></>
  );
};

export default { RadioButtonsField };
