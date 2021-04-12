import React, { useState } from "react";

import SelectButtons from "../SelectButtons";
import Rating from "../Rating";
import { CustomInput, FormFeedback, FormText, Input } from "reactstrap";
import DropdownList from "react-widgets/lib/DropdownList";
import Multiselect from "react-widgets/lib/Multiselect";

export const renderSelectButtons = ({ input, ...props }) => <SelectButtons {...props} {...input} />;



export const renderStarsRatingInput = ({ input, ...props }) => <Rating {...props} {...input} />;

export const renderSwitch = ({ id, label, input, className }) => (
  <CustomInput type="switch" checked={!!input.value} id={id} label={label} {...input} className={className} />
);

export const renderRadio = ({ id, valueToSet, label, input, meta: { touched, error, warning } }) => {
  const _onChange = (e) => {
    input.onChange(e);
  };

  return (
    <>
      <CustomInput
        type="radio"
        id={id}
        label={label}
        value={valueToSet}
        checked={valueToSet === input.value}
        onChange={_onChange}
      />
      {error && touched && <FormFeedback className="d-block mt-2">{error}</FormFeedback>}
      {!error && touched && warning && <FormText>{warning}</FormText>}
    </>
  );
};

export const renderCheckbox = ({ id, label, input, className, meta: { touched, error, warning } }) => {
  const _onChange = (e) => {
    if (input.onChange) input.onChange(e);
  };

  return (
    <>
      <CustomInput
        type="checkbox"
        onChange={_onChange}
        checked={!!input.value}
        id={id}
        label={label}
        {...input}
        className={className || ""}
        {...(touched ? (error ? { invalid: true } : {}) : {})}
      />
      {error && touched && <FormFeedback className="d-block mt-2">{error}</FormFeedback>}
      {!error && touched && warning && <FormText>{warning}</FormText>}
    </>
  );
};

export const renderButtonGroup = ({ id, valueToSet, label, input, disabled }) => {
  return (
    <button
      type="button"
      className={"tab-button " + (valueToSet === input.value ? "active" : "")}
      id={id}
      onClick={() => input.onChange(valueToSet)}
      disabled={disabled}
    >
      {label}
      {disabled && (
        <>
          <br />
          <span className="text-mutted small">brevemente</span>
        </>
      )}
    </button>
  );
};

export const renderTextInput = ({
  input,
  label,
  help,
  required,
  meta: { touched, error, warning },
  className,
  classNameInput,
  ...custom
}) => (
  <div className={"form-group " + (className || "")}>
    <Input
      {...input}
      {...(touched ? (error ? { invalid: true } : { valid: true }) : {})}
      {...custom}
      className={(input.value ? "filled " : "") + (classNameInput || "")}
    />
    {label && (
      <label htmlFor={input.name}>
        {label}
        {required ? <span className="ml-1 text-danger">*</span> : ""}
      </label>
    )}
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
    {help && <FormText color="muted">{help}</FormText>}
  </div>
);

export const renderDropdownList = ({
  input,
  label,
  meta: { touched, error, warning },
  placeholder,
  data,
  itemComponent,
  groupBy,
  groupComponent,
  valueField,
  textField,
  className,
  filter,
  onChageValue,
  ...custom
}) => {
  function handleChange(value) {
    input.onChange(value);

    if (onChageValue) {
      onChageValue(value);
    }
  }

  return (
    <div className={"form-group " + (className || "")}>
      <DropdownList
        filter={filter}
        {...input}
        {...(touched ? (error ? { invalid: true } : { valid: true }) : {})}
        {...custom}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={handleChange}
        itemComponent={itemComponent}
        groupComponent={groupComponent}
        placeholder={placeholder}
        groupBy={groupBy}
        className={
          "form-control " + (touched ? (error ? "is-invalid" : "is-valid") : "") + " " + (input.value ? " filled" : "")
        }
      />
      {label && <label htmlFor={input.name}>{label}</label>}
      {error && <FormFeedback>{error}</FormFeedback>}
      {!error && warning && <FormText>{warning}</FormText>}
    </div>
  );
};

export const renderSelect = ({ input, placeholder, className, onChageValue, options }) => {
  function handleChange(event) {
    if (onChageValue) {
      onChageValue(event.target.value);
    } else {
      input.onChange(event.target.value);
    }
  }

  return (
    <select {...input} className={className || ""} onChange={handleChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o, i) => (
        <option key={"op-order-" + i} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};



export const RenderMultiSelect = ({
  input,
  data,
  placeholder,
  valueField,
  textField,
  onCreate,
  groupBy,
  showPlaceholderWithValues,
  groupComponent,
  tagComponent,
  itemComponent,
  messages,
}) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    data={data}
    value={input.value || []}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
    onCreate={onCreate}
    showPlaceholderWithValues={showPlaceholderWithValues}
    groupComponent={groupComponent}
    tagComponent={tagComponent}
    itemComponent={itemComponent}
    placeholder={placeholder}
    groupBy={groupBy}
    messages={messages}
    dropUp={true}
  />
);
