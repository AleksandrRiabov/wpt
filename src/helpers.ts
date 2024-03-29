import {
  addDays,
  isAfter,
  format,
  startOfWeek,
  endOfWeek,
  parse,
} from "date-fns";
import { DateRange, GetTrailersDataResponse } from "./state/types";

//Formats date range from {from: Date, to: Date} to string "dd-MM-yyyy_dd-MM-yyyy"
export const formateDateRange = (dateRange: DateRange) => {
  return `dateFrom=${format(dateRange.from || 0, "dd-MM-yyyy")}&dateTo=${format(
    dateRange.to || 0,
    "dd-MM-yyyy"
  )}`;
};

export const countExtraCharges = (
  extras: GetTrailersDataResponse["extraCost"] | undefined
) => {
  if (!extras) return 0;

  return Object.keys(extras ?? {})
    .filter((extra) => typeof extras[extra]?.cost === "number")
    .reduce((total, extra) => total + (extras[extra]?.cost || 0), 0);
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

// Formates extra cost name from 'nobStop' to 'Non STop'
export const formatExtraCostName = (name: string) => {
  const result = name.replace(/([A-Z])/g, " $1").replace(/^./, function (name) {
    return name.toUpperCase();
  });
  return result;
};

export const setAccessTokenToCookie = (
  token: string,
  expirationInDays: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `accessToken=${token}; ${expires}; path=/`;
};

// Get start of the week day date always monday ('dd-mm-yyyy')
export const getStartOfWeekDate = (date: Date | null) => {
  if (!date) return null;
  // Calculate the start of the week (Monday) using the startOfWeek function
  const startOfWeekMonday = startOfWeek(date, { weekStartsOn: 1 }); // Monday is 1, Sunday is 0

  // Format the start of the week date as 'dd-mm-yyyy'
  const formattedDate = format(startOfWeekMonday, "dd-MM-yyyy");

  return formattedDate;
};

// Get end of the week day date always Sunday ('dd-mm-yyyy')
export const getEndOfWeekDate = (date: Date | null) => {
  if (!date) return null;
  // Calculate the end of the week (Sunday) using the endOfWeek function
  const endOfWeekSunday = endOfWeek(date, { weekStartsOn: 1 }); // Monday is 1, Sunday is 0

  // Format the end of the week date as 'dd-mm-yyyy'
  const formattedDate = format(endOfWeekSunday, "dd-MM-yyyy");

  return formattedDate;
};

export const parseDateString = (dateString: string | undefined) => {
  if (!dateString) return null;
  // Try to parse the date string into a valid Date object
  const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());

  if (parsedDate instanceof Date && !isNaN(parsedDate.valueOf())) {
    // The date string was successfully parsed into a valid Date object
    return parsedDate;
  } else {
    // The date string could not be parsed, or it was an invalid date
    return null;
  }
};
