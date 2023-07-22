import { useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../theme";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";
import useGetCategories from "../../../hooks/useGetCategories";
import FiltersModal from "../../../components/ModalWrapper/ModalWrapper";
import ChartFilters from "../ChartFilters";
import useFormatBarChartData from "../../../hooks/useFormatBarChartData";
import { formateDateRange } from "../../../helpers";
import { DateRange } from "../../../state/types";
import { format, subDays } from "date-fns";

// Default date from in the query
const today = new Date();
const defaultDateFrom = `dateFrom=${format(subDays(today, 30), "dd-MM-yyyy")}`;

// Default category array for the chart
const defaultCategory = ["FRESH"];

const BarChartComponent = () => {
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
  const chartData = useFormatBarChartData({ data, checkedProducts });

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
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 15,
            right: 25,
            left: -5,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke={colors.white[800]} />
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.green[400]}
                stopOpacity={0.7}
              />
              <stop
                offset="90%"
                stopColor={colors.green[200]}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.primary[500] }}
            itemStyle={{ color: colors.primary[100] }}
          />
          <Bar dataKey="casesPerPallet" fill="url(#colorBar)" />
        </BarChart>
      </ResponsiveContainer>
      <FiltersModal open={open} handleClose={handleClose}>
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDateChange={handleDateRangeChange}
          sessionStorageKey="dashboard-barchart"
        />
      </FiltersModal>
    </>
  );
};

export default BarChartComponent;
