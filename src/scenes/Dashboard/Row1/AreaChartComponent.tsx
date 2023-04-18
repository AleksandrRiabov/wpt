import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../theme";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";
import ChartFilters from "../ChartFilters";
import FiltersModal from "../../../components/FiltersModal/FiltersModal";
import useGetCategories from "../../../hooks/useGetCategories";
import useFormatChartData from "../../../hooks/useFormatChartData";
import { DateRange } from "../../../state/types";
import { format, subDays } from "date-fns";
import { formateDateRange } from "../../../helpers";

// Default date from in the query
const today = new Date();
const defaultDateFrom = format(subDays(today, 30), "dd-MM-yyyy");

// Default category array for the chart
const defaultCategory = ["Fresh"];

const AreaChartComponent = () => {
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

  return (
    <>
      <BoxHeader
        title={`Product: ${checkedProducts.join(", ")}`}
        subtitle={`From ${dateRangeQuery.split("_")[0]} - To ${
          dateRangeQuery.split("_")[1] || format(today, "dd-MM-yyyy")
        }`}
        sideText="Product / Category"
        handleOpen={handleOpen}
      />
      <Box height="100%">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 25,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="10%"
                  stopColor={colors.green[400]}
                  stopOpacity={1}
                />
                <stop
                  offset="90%"
                  stopColor={colors.green[400]}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: colors.primary[500] }}
              itemStyle={{ color: colors.primary[100] }}
            />
            <Area
              type="monotone"
              dataKey="cases"
              stroke={colors.lightBlue[800]}
              fillOpacity={0.7}
              fill="url(#colorDays)"
            />
            <Area
              type="monotone"
              dataKey="pallets"
              stroke={colors.primary[700]}
              fillOpacity={0.9}
              fill="url(#colorDays)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <FiltersModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDataChange={handleDateRangeChange}
        />
      </FiltersModal>
    </>
  );
};

export default AreaChartComponent;
