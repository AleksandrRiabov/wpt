import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetDaysDataQuery } from "../../state/api";
import { DateRange, DayDataResponse } from "../../state/types";
import { tokens } from "../../theme";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import useFormatChartData from "../../hooks/useFormatChartData";
import { format, subDays } from "date-fns";
import { formateDateRange } from "../../helpers";
import useGetCategories from "../../hooks/useGetCategories";
import ChartFilters from "../Dashboard/ChartFilters";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import BoxHeader from "../../components/BoxHeader/BoxHeader";

// Default date from in the query
const today = new Date();
const defaultDateFrom = `dateFrom=${format(subDays(today, 30), "dd-MM-yyyy")}`;

// Default category array for the chart
const defaultCategory = [] as string[];

const DayChart = () => {
  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(defaultDateFrom);

  // Use the `useState` hook to manage the checkedProducts state
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);

  const { date } = useParams();
  // Get all products data for requested day
  const { data: dayData } = useGetDaysDataQuery(
    `dateFrom=${date}&dateTo=${date}&withStats=true`
  );

  const data = dayData?.length
    ? dayData[0].pastData
    : ([] as DayDataResponse[]);

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
    <DashboardBox
      height="550px"
      sx={{
        height: { xs: "400px", md: "550px" },
        width: { xs: "320px", md: "600px", lg: "1000px" },
      }}
    >
      <BoxHeader
        title={`Product: ${selectedProducts}`}
        subtitle={`From ${dateFrom} - To ${dateTo}`}
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
      <ModalWrapper open={open} handleClose={handleClose}>
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDateChange={handleDateRangeChange}
          sessionStorageKey="dashboard-areachart"
        />
      </ModalWrapper>
    </DashboardBox>
  );
};

export default DayChart;
