import { useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../theme";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";
import FiltersModal from "../../../components/ModalWrapper/ModalWrapper";
import ChartFilters from "../../../components/ChartFilters";
import useGetCategories from "../../../hooks/useGetCategories";
import useFormatChartData from "../../../hooks/useFormatChartData";
import { format } from "date-fns";
import { subDays } from "date-fns/esm";
import { DateRange } from "../../../state/types";
import { formateDateRange } from "../../../helpers";

// Default date from in the query
const today = new Date();
const defaultDateFrom = `dateFrom=${format(subDays(today, 30), "dd-MM-yyyy")}`;

// Default category array for the chart
const defaultCategory = ["AMBIENT"];

const LineChartCompnent = () => {
  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(defaultDateFrom);

  // Use the `useState` hook to manage the checkedProducts state
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);

  // Use the `useGetDaysDataQuery` hook to fetch data
  const { data } = useGetDaysDataQuery(dateRangeQuery);

  // Use the `useTheme` hook to access the MUI theme object
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: -20,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} stroke={colors.white[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.primary[500] }}
            itemStyle={{ color: colors.primary[100] }}
          />
          <Legend
            height={20}
            wrapperStyle={{
              margin: "10px 0 10px 0",
              width: "100%",
              left: 0,
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cases"
            stroke={colors.green[100]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pallets"
            stroke={colors.green[400]}
          />
        </LineChart>
      </ResponsiveContainer>
      <FiltersModal open={open} handleClose={handleClose}>
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDateChange={handleDateRangeChange}
          sessionStorageKey="dashboard-line-chart"
        />
      </FiltersModal>
    </>
  );
};

export default LineChartCompnent;
