import React from "react";
import { Field } from "redux-form";
import {
  renderInitialDepositFilter,
  renderMonthlyRentRangeFilter,
  renderVehiclePriceRangeFilter,
  renderNumberOfKilometersFilter,
  renderBrandModelsFilter,
  renderNumberOfKilometersYearFilter,
  renderNumberOfMonthsFilter,
  renderColorTypesFilter,
  renderRangeOfKilometersFilter,
  renderCheckboxesFilter
} from "../ReduxFormRenders/FilterRenders";
import {
  renderMonthlyRentCard,
  renderMonthlyRentRangeCard,
  renderInitialDepositCard,
  renderNumberOfKilometersCard,
  renderNumberOfKilometersYearCard,
  renderNumberOfMonthsCard,
  renderVehiclePriceRangeCard,
  renderRecoveryValueCard
} from "../ReduxFormRenders/CardRenders";
import {
  renderInputMask,
  renderStarsRatingInput
} from "../ReduxFormRenders/InputsRenders";
import { PAYMENT_TYPES } from "src/components/GlobalConstants";
import { ButtonGroupField } from "./ButtonGroupField";
import { isPlateNumber } from "../Validators/validators";

//op_initialDeposit
export const FilterInitialDepositField = props => (
  <Field name="op_initialDeposit" component={renderInitialDepositFilter} />
);

export const CardInitialDepositField = props => (
  <Field
    name="op_initialDeposit"
    component={renderInitialDepositCard}
    {...props}
  />
);

//op_monthlyRange
export const FilterMonthlyRentRangeField = props => (
  <Field
    name="op_monthlyRange"
    component={renderMonthlyRentRangeFilter}
    {...props}
  />
);

export const CardMonthlyRentRangeField = props => (
  <Field
    name="op_monthlyRange"
    component={renderMonthlyRentRangeCard}
    {...props}
  />
);

//op_vehiclePriceRange
export const FilterVehiclePriceRangeField = props => (
  <Field
    name="op_vehiclePriceRange"
    component={renderVehiclePriceRangeFilter}
    {...props}
  />
);

export const CardVehiclePriceRangeField = props => (
  <Field name="op_vehiclePriceRange" component={renderVehiclePriceRangeCard} {...props} />
);


export const FilterPaymentTypeField = (props) => {
  return (
    <ButtonGroupField name="op_paymentTypeSelected" options={PAYMENT_TYPES} {...props} />
  )
};

//op_kilometersYear
export const FilterNumberOfKilometersYearField = props => (
  <Field
    name="op_kilometersYear"
    component={renderNumberOfKilometersYearFilter}
    {...props}
  />
);

export const CardNumberOfKilometersYearField = props => (
  <Field
    name="op_kilometersYear"
    component={renderNumberOfKilometersYearCard}
    {...props}
  />
);

//op_numberMonths
export const FilterNumberOfMonthsField = props => (
  <Field name="op_numberMonths" component={renderNumberOfMonthsFilter} {...props} />
);

export const CardNumberOfMonthsField = props => (
  <Field name="op_numberMonths" component={renderNumberOfMonthsCard} {...props} />
);

//rv_numberKilometers
export const FilterNumberOfKilometersField = props => (
  <Field
    name="rv_numberKilometers"
    component={renderNumberOfKilometersFilter}
    {...props}
  />
);

export const CardNumberOfKilometersField = props => (
  <Field name="rv_numberKilometers" component={renderNumberOfKilometersCard} {...props} />
);

//brandmodels
export const FilterBrandModelsField = props => (
  <Field name="brandmodels" component={renderBrandModelsFilter} />
);

//op_monthlyRent
export const CardMonthlyRentField = props => (
  <Field name="op_monthlyRent" component={renderMonthlyRentCard} {...props} />
);

//op_financialTypeDefinition
export const FinancialTypeDefinitionField = props => (
  <ButtonGroupField name="op_financialTypeDefinition" {...props} />
);

//rv_plate
export const VehiclePlateNumberField = props => (
  <Field
    name="rv_plate"
    component={renderInputMask}
    className={"inputPlate w-100 text-uppercase"}
    placeholder="__-__-__"
    validate={[isPlateNumber]}
    mask="**-**-**"
  />
);

//rv_rating
export const ExchangeVehicleRatingField = props => (
  <Field name="rv_rating" component={renderStarsRatingInput} />
);

//op_recoveryValue
export const CardRecoveryValueField = props => (
  <Field
    name="op_recoveryValue"
    component={renderRecoveryValueCard}
    {...props}
  />
);

//op_newused
export const FilterNewUsedField = props => (
  <Field name="op_newused" component={renderCheckboxesFilter} {...props} />
);

//op_enginetypes
export const FilterEngineTypesField = props => (
  <Field name="op_enginetypes" component={renderCheckboxesFilter} {...props} />
);

//op_colors
export const FilterColorTypesField = props => (
  <Field name="op_colors" component={renderColorTypesFilter} {...props} />
);

//op_transmission
export const FilterTransmissionField = props => (
  <Field name="op_transmission" component={renderCheckboxesFilter} {...props} />
);

//op_discounttypes
export const FilterDiscountTypesField = props => (
  <Field name="op_discounttypes" component={renderCheckboxesFilter} {...props} />
);

//op_kilometersRange
export const FilterRangeOfKilometersField = props => (
  <Field
    name="op_kilometersRange"
    component={renderRangeOfKilometersFilter}
    {...props}
  />
);