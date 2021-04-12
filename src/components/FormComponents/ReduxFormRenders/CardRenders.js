import React from "react";
import CardInitialDeposit from "src/components/Cards/CardInitialDeposit";
import CardMonthlyRent from "src/components/Cards/CardMonthlyRent";
import CardMonthlyRentRange from "src/components/Cards/CardMonthlyRentRange";
import CardNumberOfKilometers from "src/components/Cards/CardNumberOfKilometers";
import CardNumberOfKilometersYear from "src/components/Cards/CardNumberOfKilometersYear";
import CardNumberOfMonths from "src/components/Cards/CardNumberOfMonths";
import CardVehiclePriceRange from "src/components/Cards/CardVehiclePriceRange";
import CardRecoveryValue from "src/components/Cards/CardRecoveryValue";

export const renderInitialDepositCard = ({ input, ...props }) => (
  <CardInitialDeposit {...props} {...input} />
);

export const renderMonthlyRentCard = ({ input, ...props }) => (
  <CardMonthlyRent {...props} {...input} />
);

export const renderMonthlyRentRangeCard = ({ input, ...props }) => (
  <CardMonthlyRentRange {...props} {...input} />
);

export const renderRecoveryValueCard = ({ input, ...props }) => (
  <CardRecoveryValue {...props} {...input} />
);

export const renderNumberOfKilometersCard = ({ input, ...props }) => (
  <CardNumberOfKilometers {...props} {...input} />
);

export const renderNumberOfKilometersYearCard = ({ input, ...props }) => (
  <CardNumberOfKilometersYear {...props} {...input} />
);

export const renderNumberOfMonthsCard = ({ input, ...props }) => (
  <CardNumberOfMonths {...props} {...input} />
);

export const renderVehiclePriceRangeCard = ({ input, ...props }) => (
  <CardVehiclePriceRange {...props} {...input} />
);