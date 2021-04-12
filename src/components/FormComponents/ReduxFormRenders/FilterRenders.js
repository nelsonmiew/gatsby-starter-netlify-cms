import React from "react";
import FilterInitialDeposit from "../../Filters/FilterInitialDeposit";
import FilterMonthlyRentRange from "../../Filters/FilterMonthlyRentRange";
import FilterNumberOfKilometers from "../../Filters/FilterNumberOfKilometers";
import FilterNumberOfKilometersYear from "../../Filters/FilterNumberOfKilometersYear";
import FilterNumberOfMonths from "../../Filters/FilterNumberOfMonths";
import FilterVehiclePriceRange from "../../Filters/FilterVehiclePriceRange";
import FilterBrandModels from "../../Filters/FilterBrandModel";
import FilterColorTypes from "../../Filters/FilterColorTypes";
import FilterRangeOfKilometers from "../../Filters/FilterRangeOfKilometers";
import FilterCheckboxs from "../../Filters/FilterCheckboxs";

export const renderInitialDepositFilter = ({ input, ...props }) => (
  <FilterInitialDeposit {...props} {...input} />
);

export const renderMonthlyRentRangeFilter = ({ input, ...props }) => (
  <FilterMonthlyRentRange {...props} {...input} />
);

export const renderNumberOfKilometersFilter = ({ input, ...props }) => (
  <FilterNumberOfKilometers {...props} {...input} />
);

export const renderNumberOfKilometersYearFilter = ({ input, ...props }) => (
  <FilterNumberOfKilometersYear {...props} {...input} />
);

export const renderNumberOfMonthsFilter = ({ input, ...props }) => (
  <FilterNumberOfMonths {...props} {...input} />
);

export const renderVehiclePriceRangeFilter = ({ input, ...props }) => (
  <FilterVehiclePriceRange {...props} {...input} />
);

export const renderBrandModelsFilter = ({ input, ...props }) => (
  <FilterBrandModels {...props} {...input} />
);

export const renderCheckboxesFilter = ({ input, ...props }) => (
  <FilterCheckboxs {...props} {...input} />
);

export const renderColorTypesFilter = ({ input, ...props }) => (
  <FilterColorTypes {...props} {...input} />
);

export const renderRangeOfKilometersFilter = ({ input, ...props }) => (
  <FilterRangeOfKilometers {...props} {...input} />
);