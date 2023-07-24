import { useState } from "react";

import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";
import ChartFilters from "../ChartFilters";
import FiltersModal from "../../../components/ModalWrapper/ModalWrapper";
import useGetCategories from "../../../hooks/useGetCategories";
import useFormatChartData from "../../../hooks/useFormatChartData";
import { DateRange } from "../../../state/types";
import { format, subDays } from "date-fns";
import { formateDateRange } from "../../../helpers";
import LineChart from "../../../components/LineChart";

// Default date from in the query
const today = new Date();
const defaultDateFrom = `dateFrom=${format(subDays(today, 30), "dd-MM-yyyy")}`;

// Default category array for the chart
const defaultCategory = ["FRESH"];

const AreaChartComponent = () => {
  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(defaultDateFrom);

  // Use the `useState` hook to manage the checkedProducts state
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);

  // Use the `useGetDaysDataQuery` hook to fetch data
  const { data } = useGetDaysDataQuery(dateRangeQuery);

  // Use the `useState` hook to manage the open state of the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use custom hooks to get the categories and format the chart data
  const categories = useGetCategories(data);
  const chartData = useFormatChartData({ data, checkedProducts });

  //On change format date range and update state/query
  const handleDateRangeChange = (dateRange: DateRange) => {
    const formatedDateRange = formateDateRange(dateRange);
    setDateRangeQuery(formatedDateRange);
  };

  const dateFrom = dateRangeQuery.slice(9, 19);
  const dateTo = dateRangeQuery.slice(27) || format(today, "dd-MM-yyyy");

  const selectedProducts = checkedProducts.join(", ").length
    ? checkedProducts.join(", ")
    : "ALL";

  return (
    <>
      <BoxHeader
        title={`Product: ${selectedProducts}`}
        subtitle={`From ${dateFrom} - To ${dateTo}`}
        handleOpen={handleOpen}
      />
      <LineChart chartData={chartData} />
      <FiltersModal open={open} handleClose={handleClose}>
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDateChange={handleDateRangeChange}
          sessionStorageKey="dashboard-areachart"
        />
      </FiltersModal>
    </>
  );
};

export default AreaChartComponent;
