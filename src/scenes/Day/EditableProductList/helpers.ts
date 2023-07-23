import { parse, format, addDays, subDays } from "date-fns";
import { DataRow } from "../types";

export const countExpectedPallets = (cases: number, coefficient: number) => {
  if (!cases || !coefficient || isNaN(cases) || isNaN(coefficient)) return 0;
  return +(cases / coefficient).toFixed(1);
};

interface FormattedDates {
  current: string;
  previous: string;
  next: string;
}

//Returnes Formated date "DAY dd-mm-yyyy" with previous and next day (using in table header)
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
    expectedCases: 0,
    expectedPallets: 0,
  };

  const totals = tableData.reduce((prev, current) => {
    return {
      cases: (+prev.cases || 0) + (+current.cases || 0),
      pallets: (+prev.pallets || 0) + (+current.pallets || 0),
      expectedCases: prev.expectedCases + +current.calculatedCases,
      expectedPallets: +prev.expectedPallets + +current.calculatedPallets,
    };
  }, initialTotals);

  return totals;
};

export const palletsToTrailers = (pallets: number) => {
  if (!pallets || isNaN(pallets)) return 0;
  const trailers = pallets / 26;

  return trailers.toFixed(2);
};

export const displayTrailersAndPallets = (trailersQty: number) => {
  const fullTrailers = Math.floor(trailersQty / 26);
  const balancePallets = Math.ceil(trailersQty % 26);

  const trailersText = fullTrailers > 1 ? "Trailers" : "Trailer";
  const palletsText = balancePallets > 1 ? "Pallets" : "Pallet";

  const trailersStr =
    fullTrailers === 0 ? "" : `${fullTrailers} ${trailersText}`;
  const palletsStr =
    balancePallets === 0 ? "" : `${balancePallets} ${palletsText}`;

  const coma = fullTrailers === 0 ? "" : ",";

  return `${trailersStr}${coma} ${palletsStr}`;
};

type CombinedData = {
  name: string;
  cases: number | string;
  pallets: number | string;
  category: string | string;
  coefficient: number;
  expectedCases: number | string;
  calculatedCases: number;
  calculatedPallets: number;
}[];

export const getEstimates = (data: CombinedData | DataRow[]) => {
  return data.map((product) => {
    const { pallets, cases, coefficient, expectedCases } = product;

    const calculatedCases = !!cases ? +cases : +expectedCases;

    const trailers = palletsToTrailers(+pallets);
    // if no actual cases useExpectedCases to predict trailers
    const calculatedPallets = countExpectedPallets(
      +calculatedCases,
      coefficient
    );
    const expectedTrailers = palletsToTrailers(calculatedPallets);

    return {
      ...product,
      trailers,
      calculatedCases,
      calculatedPallets,
      expectedTrailers,
      expectedCases,
    };
  });
};

// Return number of the day of the week. Monday 1, Tuesday 2. ..
export const getDayOfWeekNumber = (dateStr: string | undefined) => {
  if (!dateStr) {
    return -1; // Return -1 to indicate that the date is undefined
  }

  const date = parse(dateStr, "dd-MM-yyyy", new Date());
  const dayOfWeekNumber = date.getDay();
  return dayOfWeekNumber;
};

//get default dates for the chart, requested date - 30 days - requested date
export const getDefaultDates = (dateStr: string | undefined) => {
  if (!dateStr) {
    dateStr = format(new Date(), "dd-MM-yyyy");
  }

  const date = parse(dateStr, "dd-MM-yyyy", new Date());
  const defaultDateFrom = `dateFrom=${format(subDays(date, 30), "dd-MM-yyyy")}`;

  return { defaultDateFrom, defaultDateTo: date };
};
