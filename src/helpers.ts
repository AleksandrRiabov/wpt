import { format } from "date-fns";
import { DateRange } from "./state/types";

//Formats date range from {from: Date, to: Date} to string "dd-MM-yyyy_dd-MM-yyyy"
export const formateDateRange = (dateRange: DateRange) => {
  return `${format(dateRange.from || 0, "dd-MM-yyyy")}_${format(
    dateRange.to || 0,
    "dd-MM-yyyy"
  )}`;
};
