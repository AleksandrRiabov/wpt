import { parse, format, addDays, subDays } from "date-fns";
import { DataRow } from "../types";

export const palletsToTrailers = (pallets: number) => {
  if (!pallets || isNaN(pallets)) return 0;
  const trailers = pallets / 26;

  return trailers.toFixed(2);
};

export const countExpectedPallets = (cases: number, coefficient: number) => {
  if (!cases || !coefficient || isNaN(cases) || isNaN(coefficient)) return 0;
  return +(cases / coefficient).toFixed(1);
};

interface FormattedDates {
  current: string;
  previous: string;
  next: string;
}

export const getFormattedDateWithAdjacentDays = (
  date: string | undefined
): FormattedDates => {
  try {
    if (!date) return { current: "No Date", previous: "", next: "" };

    const dateObject = parse(date, "dd-MM-yyyy", new Date());
    if (isNaN(dateObject.getTime())) {
      // Invalid date input
      return { current: "Invalid Date", previous: "", next: "" };
    }

    const formattedDate = (d: Date) => format(d, "EEEE dd-MM-yyyy");

    const previousDate = subDays(dateObject, 1);
    const nextDate = addDays(dateObject, 1);

    const formattedCurrentDate = formattedDate(dateObject);
    const formattedPreviousDate = format(previousDate, "dd-MM-yyyy");
    const formattedNextDate = format(nextDate, "dd-MM-yyyy");

    return {
      current: formattedCurrentDate,
      previous: formattedPreviousDate,
      next: formattedNextDate,
    };
  } catch (error) {
    // Handle any parsing or formatting errors here
    console.error("Error occurred while formatting date:", error);
    return { current: "Error Occurred", previous: "", next: "" };
  }
};

export const getDayTotals = (tableData: DataRow[]) => {
  const initialTotals = {
    cases: 0,
    pallets: 0,
    trailers: 0,
    expectedCases: 0,
    expectedPallets: 0,
    expectedTrailers: 0,
  };

  const totals = tableData.reduce((prev, current) => {
    return {
      cases: +prev.cases + +current.cases,
      pallets: +prev.pallets + +current.pallets,
      trailers: +prev.trailers + +current.trailers,
      expectedCases: +current.expectedCases
        ? +prev.expectedCases + +current.expectedCases
        : 0,
      expectedPallets: +prev.expectedPallets + +current.expectedPallets,
      expectedTrailers: +prev.expectedTrailers + +current.expectedTrailers,
    };
  }, initialTotals);

  return totals;
};
