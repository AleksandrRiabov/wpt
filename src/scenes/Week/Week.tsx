import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import TopSection from "./TopSection/TopSection";
import WeekTable from "./WeekTable/WeekTable";
import { useParams } from "react-router-dom";
import {
  formateDateRange,
  getEndOfWeekDate,
  getStartOfWeekDate,
  parseDateString,
} from "../../helpers";
import { useGetDaysDataQuery } from "../../state/api";
import useFormatChartData from "../../hooks/useFormatChartData";
import { DateRange } from "../../state/types";
import { getISOWeek } from "date-fns";
import useCalculateWeekStats from "./useCalculateWeekStats";

// Default category array for the chart
const defaultCategory = [] as string[];

const Week = () => {
  const { startDay } = useParams();
  const [startDate, setStartDate] = useState(parseDateString(startDay));

  useEffect(() => {
    setStartDate(parseDateString(startDay));
  }, [startDay]);

  const defaultDateFrom = getStartOfWeekDate(startDate);
  const defaultDateTo = getEndOfWeekDate(startDate);

  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(
    `dateFrom=${defaultDateFrom}&dateTo=${defaultDateTo}`
  );

  // Use the `useState` hook to manage the checkedProducts state
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);

  // Fetch data for the selected day using the date range query and day of the week
  const { data, refetch, isFetching } = useGetDaysDataQuery(dateRangeQuery);

  // Use the `useEffect` hook to refetch data when startDate changes
  useEffect(() => {
    const newDateFrom = getStartOfWeekDate(startDate);
    const newDateTo = getEndOfWeekDate(startDate);
    const newDateRangeQuery = `dateFrom=${newDateFrom}&dateTo=${newDateTo}`;

    setDateRangeQuery(newDateRangeQuery);
    refetch();
  }, [startDate, refetch]);

  // On date range change, format the date range and update the state/query
  const handleDateRangeChange = (dateRange: DateRange) => {
    const formatedDateRange = formateDateRange(dateRange);
    setDateRangeQuery(formatedDateRange);
  };

  // Formated Chart Data
  const chartData = useFormatChartData({ data, checkedProducts });

  // Get Week stats. If some product checked on chart it will display only those products totals
  const weekStats = useCalculateWeekStats({ data: chartData });

  // Get week number from the date
  const currentWeekNumber = startDate ? getISOWeek(startDate) : "";

  // Indicates if any filters applied, (not including date range)
  const filtersApplied = !!checkedProducts.length;

  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title={`Week  - ${currentWeekNumber}`} />

      <Box>
        <TopSection
          chartData={chartData}
          data={data}
          dateRangeQuery={dateRangeQuery}
          defaultCategory={defaultCategory}
          defaultDateTo={defaultDateTo}
          checkedProducts={checkedProducts}
          setCheckedProducts={setCheckedProducts}
          handleDateRangeChange={handleDateRangeChange}
          isFetching={isFetching}
          startDate={startDate}
          weekStats={weekStats}
          filtersApplied={filtersApplied}
        />
        <WeekTable />
      </Box>
    </Container>
  );
};

export default Week;
