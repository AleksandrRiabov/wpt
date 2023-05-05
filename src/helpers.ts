import { addDays, isAfter, format } from "date-fns";
import { DateRange, GetTrailersDataResponse } from "./state/types";

//Formats date range from {from: Date, to: Date} to string "dd-MM-yyyy_dd-MM-yyyy"
export const formateDateRange = (dateRange: DateRange) => {
  return `dateFrom=${format(dateRange.from || 0, "dd-MM-yyyy")}&dateTo=${format(
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

export const getSuggestedDeliveryDate = () => {
  const now = new Date();
  const afterFive = isAfter(
    now,
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5)
  );

  let futureDate = now;

  if (afterFive) {
    futureDate = addDays(futureDate, 3);
  } else {
    futureDate = addDays(futureDate, 2);
  }

  // const formattedDate = format(futureDate, 'yyyy-MM-dd')

  return futureDate;
};

