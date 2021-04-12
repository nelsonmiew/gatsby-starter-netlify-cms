import React from "react";
import { Field } from "redux-form";
import { renderSwitch } from "../ReduxFormRenders/InputsRenders";

export const SwitchField = props => (
  <Field name={props.name} component={renderSwitch} {...props} />
);

export default { SwitchField };
