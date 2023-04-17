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
import FiltersModal from "../../../components/FiltersModal/FiltersModal";
import ChartFilters from "../ChartFilters";
import useFormatBarChartData from "../../../hooks/useFormatBarChartData";

// Default category array for the chart
const defaultCategory = ["Fresh"];

const BarChartComponent = () => {
  // Use the `useState` hook to manage the checkedProducts state
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);

  // Use the `useGetDaysDataQuery` hook to fetch data
  const { data } = useGetDaysDataQuery("01-04-2023_01-01-2029");

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

  return (
    <>
      <BoxHeader
        title="Cases Per Pallet"
        subtitle="7 Days Statistics"
        sideText="Select Products"
        handleOpen={handleOpen}
      />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 15,
            right: 50,
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
      <FiltersModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
        />
      </FiltersModal>
    </>
  );
};

export default BarChartComponent;
