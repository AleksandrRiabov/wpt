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

// Default category array for the chart
const defaultCategory = [] as string[];

const Week = () => {
  const { startDay } = useParams();

  const startDate = parseDateString(startDay);
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

  // Use the `useEffect` hook to refetch data when startDay changes
  useEffect(() => {
    const newDateFrom = getStartOfWeekDate(parseDateString(startDay));
    const newDateTo = getEndOfWeekDate(parseDateString(startDay));
    const newDateRangeQuery = `dateFrom=${newDateFrom}&dateTo=${newDateTo}`;

    setDateRangeQuery(newDateRangeQuery);
    refetch();
  }, [startDay, refetch]);

  const chartData = useFormatChartData({ data, checkedProducts });

  // On date range change, format the date range and update the state/query
  const handleDateRangeChange = (dateRange: DateRange) => {
    const formatedDateRange = formateDateRange(dateRange);
    setDateRangeQuery(formatedDateRange);
  };

  const handleChangeStartDate = (newDate: Date) => {
    const newDateFrom = getStartOfWeekDate(newDate);
    const newDateTo = getEndOfWeekDate(newDate);
    const newDateRangeQuery = `dateFrom=${newDateFrom}&dateTo=${newDateTo}`;

    setDateRangeQuery(newDateRangeQuery);
    refetch();
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title={`Week ${startDay}`} />

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
          handleChangeStartDate={handleChangeStartDate}
          isFetching={isFetching}
          startDate={startDate}
        />
        <WeekTable />
      </Box>
    </Container>
  );
};

export default Week;
