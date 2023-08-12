import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { DateRange } from "../../state/types";
import { useGetDaysDataQuery } from "../../state/api";
import useFormatChartData from "../../hooks/useFormatChartData";
import useGetCategories from "../../hooks/useGetCategories";
import { formateDateRange } from "../../helpers";
import {
  getDayOfWeekNumber,
  getDefaultDates,
} from "./EditableProductList/helpers";

import DashboardBox from "../../components/dashboardBox/DashboardBox";
import ChartFilters from "../../components/ChartFilters";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import BoxHeader from "../../components/BoxHeader/BoxHeader";
import LineChart from "../../components/LineChart";

// Default category array for the chart
const defaultCategory = [] as string[];

const DayChart = () => {
  // Get the date parameter from the URL using useParams
  const { date } = useParams();

  // Calculate default date range based on the date parameter
  const { defaultDateFrom, defaultDateTo } = getDefaultDates(date);

  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(defaultDateFrom);

  // Use the `useState` hook to manage the checkedProducts state
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);

  // Get the day of the week (0 for Sunday, 1 for Monday, etc.) from the date
  const day = getDayOfWeekNumber(date);

  // Fetch data for the selected day using the date range query and day of the week
  const { data, refetch } = useGetDaysDataQuery(`${dateRangeQuery}&day=${day}`);
  useEffect(() => {
    refetch(); // Refetch data when date or day changes
  }, [date, refetch]);

  // Use the `useState` hook to manage the open state of the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use custom hooks to get the categories and format the chart data
  const categories = useGetCategories(data);
  const chartData = useFormatChartData({ data, checkedProducts });

  // On date range change, format the date range and update the state/query
  const handleDateRangeChange = (dateRange: DateRange) => {
    const formatedDateRange = formateDateRange(dateRange);
    setDateRangeQuery(formatedDateRange);
  };

  // Extract dateFrom and dateTo from the dateRangeQuery
  const dateFrom = dateRangeQuery.slice(9, 19);
  const dateTo =
    dateRangeQuery.slice(27) || format(defaultDateTo, "dd-MM-yyyy");

  // Generate a string representing the selected products for display
  const selectedProducts = checkedProducts.join(", ").length
    ? checkedProducts.join(", ")
    : "ALL";

  return (
    <DashboardBox
      height="550px"
      sx={{
        height: { xs: "400px", md: "550px" },
        width: { xs: "320px", md: "600px", lg: "1000px" },
      }}
    >
      {/* BoxHeader component with information about selected products, date range  and setings button*/}
      <BoxHeader
        title={`Product: ${selectedProducts}`}
        subtitle={`From ${dateFrom} - To ${dateTo}`}
        handleOpen={handleOpen}
      />

      {/* LineChart component for displaying the chart */}
      <LineChart chartData={chartData} />

      {/* ModalWrapper component to show the ChartFilters in a modal */}
      <ModalWrapper open={open} handleClose={handleClose}>
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDateChange={handleDateRangeChange}
          sessionStorageKey="day-areachart"
        />
      </ModalWrapper>
    </DashboardBox>
  );
};

export default DayChart;
