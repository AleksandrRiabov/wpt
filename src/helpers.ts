import { format } from "date-fns";
import { DateRange, GetTrailersDataResponse } from "./state/types";

//Formats date range from {from: Date, to: Date} to string "dd-MM-yyyy_dd-MM-yyyy"
export const formateDateRange = (dateRange: DateRange) => {
  return `${format(dateRange.from || 0, "dd-MM-yyyy")}_${format(
    dateRange.to || 0,
    "dd-MM-yyyy"
  )}`;
};

export const countExtraCharges = (
  extras: GetTrailersDataResponse["extraCost"]
) => {
  return Object.keys(extras ?? {})
    .filter((extra) => typeof extras[extra]?.cost === "number")
    .reduce((total, extra) => total + extras[extra]?.cost!, 0);
};
