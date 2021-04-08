import moment from "moment";
import "moment/locale/pt";

export const DateShortFormat = (value) => {
  moment.locale("pt");
  if (!value || value.indexOf("0001-01-01") === 0) return "-- / -- / ----";
  const rest = moment(value).format("L");
  return rest;
};

export const DateLongFormat = (value) => {
  moment.locale("pt");
  if (!value || value.indexOf("0001-01-01") === 0) return "--- -- --";
  const rest = moment(value).format("L LT");
  return rest;
};
