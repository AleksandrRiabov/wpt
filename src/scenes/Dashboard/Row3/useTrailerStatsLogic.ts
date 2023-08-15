import { useEffect, useState } from "react";
import { useGetTrailersDataQuery } from "../../../state/api";
import {
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { formateDateRange } from "../../../helpers";
import { GetTrailersDataResponse } from "../../../state/types";

// Default trailer cost
const trailerCost = 3200;

// Default date from in the query
const today = new Date();
// Calculate the start date of the current month
const startDateOfMonth = startOfMonth(today);

// Calculate the end date of the current month
const endDateOfMonth = endOfMonth(today);

// Set the default date range for the query
const defaultDateRange = formateDateRange({
  from: startDateOfMonth,
  to: endDateOfMonth,
});

const useTrailerStatsLogic = () => {
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

  // Handle date change for navigating between months
  const handleDateChange = (direction: string) => {
    let newCurrentDate: Date;

    if (direction === "left") {
      newCurrentDate = subMonths(currentDate, 1);
    } else {
      newCurrentDate = addMonths(currentDate, 1);
    }

    setCurrentDate(newCurrentDate);
    const newDateRange = formateDateRange({
      from: startOfMonth(newCurrentDate),
      to: endOfMonth(newCurrentDate),
    });

    setDateRangeQuery(newDateRange);
  };

  // Calculate total extra cost from trailers' extra cost data
  const calculateTotalExtraCost = (
    trailers: GetTrailersDataResponse[] | undefined
  ) => {
    if (!trailers || !trailers.length) return 0;
    let totalExtraCost = 0;

    trailers.forEach((trailer) => {
      // Iterate through each key in the extraCost object
      Object.values(trailer.extraCost).forEach((extraCost) => {
        // Access the 'cost' property within each cost type
        const costValue = extraCost?.cost || 0;
        totalExtraCost += costValue;
      });
    });

    return totalExtraCost;
  };

  // Calculate total cases from trailers' products
  const calculateTotalCases = (
    trailers: GetTrailersDataResponse[] | undefined
  ) => {
    let totalCases = 0;
    trailers?.forEach((trailer) => {
      const singleTrailerCases = trailer.products.reduce(
        (a, b) => a + b.cases,
        0
      );
      totalCases += singleTrailerCases;
    });
    return totalCases;
  };

  // Calculate total extra cost, total trailers, monthly trailers cost, and average case delivery cost
  const totalExtraCost = calculateTotalExtraCost(data);
  const totalTrailers = data?.length || 0;
  const monthlyTrailersCost = totalTrailers * trailerCost + totalExtraCost;
  const avgCaseDeliveryCost = monthlyTrailersCost / calculateTotalCases(data);

  // Return the computed values and functions for the component
  return {
    isFetching,
    isError,
    totalExtraCost,
    totalTrailers,
    calculateTotalCases,
    avgCaseDeliveryCost,
    handleDateChange,
    currentDateStr: format(currentDate, "MMMM - yyyy"),
    monthlyTrailersCost,
  };
};

export default useTrailerStatsLogic;
