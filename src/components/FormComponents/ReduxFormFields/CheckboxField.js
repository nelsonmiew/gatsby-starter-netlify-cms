import React from "react";
import { Field } from "redux-form";
import { renderCheckbox } from "../ReduxFormRenders/InputsRenders";

export const CheckboxField = props => (
  <Field name={props.name} component={renderCheckbox} {...props} />
);

export default { CheckboxField };
