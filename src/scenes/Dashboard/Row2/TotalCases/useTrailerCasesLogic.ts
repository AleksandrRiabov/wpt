import { useEffect, useState } from "react";
import { useGetTrailersDataQuery } from "../../../../state/api";
import { addYears, endOfYear, format, startOfYear, subYears } from "date-fns";
import { formateDateRange } from "../../../../helpers";
import { GetTrailersDataResponse } from "../../../../state/types";

// Default date from in the query
const today = new Date();
// Calculate the start date of the current year
const startDateOfYear = startOfYear(today);

// Calculate the end date of the current yesr
const endDateOfYear = endOfYear(today);

// Set the default date range for the query
const defaultDateRange = formateDateRange({
  from: startDateOfYear,
  to: endDateOfYear,
});

type Totals = {
  [key: string]: number;
};

const useTrailerCasesLogic = () => {
  // Use the `useState` hook to manage startDate
  const [currentDate, setCurrentDate] = useState(today);
  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(defaultDateRange);

  // Use the `useGetTrailersDataQuery` hook to fetch data
  const { data, isFetching, isError, refetch } =
    useGetTrailersDataQuery(dateRangeQuery);

  // Fetch data on component mount and when date range changes
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Handle date change for navigating between years
  const handleDateChange = (direction: string) => {
    let newCurrentDate: Date;

    if (direction === "left") {
      newCurrentDate = subYears(currentDate, 1);
    } else {
      newCurrentDate = addYears(currentDate, 1);
    }

    setCurrentDate(newCurrentDate);
    const newDateRange = formateDateRange({
      from: startOfYear(newCurrentDate),
      to: endOfYear(newCurrentDate),
    });

    setDateRangeQuery(newDateRange);
  };

  // Calculate total cases from trailers' products
  const calculateTotalCases = (
    trailers: GetTrailersDataResponse[] | undefined
  ) => {
    const totals = {} as Totals;
    trailers?.forEach((trailer) => {
      trailer.products.forEach((product) => {
        if (!totals[product.category]) {
          totals[product.category] = product.cases;
        } else {
          totals[product.category] += product.cases;
        }
      });
    });
    return totals;
  };

  const totals = calculateTotalCases(data);

  const formatChartData = Object.keys(totals).map((product) => {
    return { name: product, value: totals[product] };
  });

  // Return the computed values and functions for the component
  return {
    isFetching,
    isError,
    chartData: formatChartData,
    calculateTotalCases,
    handleDateChange,
    currentDateStr: format(currentDate, "yyyy"),
  };
};

export default useTrailerCasesLogic;
