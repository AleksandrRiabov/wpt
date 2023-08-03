import React, { useState } from "react";
import LineChart from "../../../components/LineChart";
import ModalWrapper from "../../../components/ModalWrapper/ModalWrapper";
import ChartFilters from "../../Dashboard/ChartFilters";
import useGetCategories from "../../../hooks/useGetCategories";
import { DateRange, GetDaysDataResponse } from "../../../state/types";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";
import { Box, Typography } from "@mui/material";

type Props = {
  chartData: {
    cases: number;
    pallets: number;
    name: string;
  }[];
  defaultCategory: string[];
  dateRangeQuery: string;
  data: GetDaysDataResponse[] | undefined;
  defaultDateTo: string | null;
  checkedProducts: string[];
  setCheckedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  handleDateRangeChange: (dateRange: DateRange) => void;
};

const WeekChart = ({
  chartData,
  data,
  defaultDateTo,
  dateRangeQuery,
  checkedProducts,
  setCheckedProducts,
  handleDateRangeChange,
}: Props) => {
  // Use the `useState` hook to manage the open state of the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use custom hooks to get the categories and format the chart data
  const categories = useGetCategories(data);

  // Extract dateFrom and dateTo from the dateRangeQuery
  const dateFrom = dateRangeQuery.slice(9, 19);
  const dateTo = dateRangeQuery.slice(27) || defaultDateTo;

  // Generate a string representing the selected products for display
  const selectedProducts = checkedProducts.join(", ").length
    ? checkedProducts.join(", ")
    : "ALL";

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BoxHeader
        title={`Product: ${selectedProducts}`}
        subtitle={`From ${dateFrom} - To ${dateTo}`}
        handleOpen={handleOpen}
      />
      <LineChart chartData={chartData} />
      {/* ModalWrapper component to show the ChartFilters in a modal */}
      <ModalWrapper open={open} handleClose={handleClose}>
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
          onDateChange={handleDateRangeChange}
          sessionStorageKey="dashboard-areachart"
        />
      </ModalWrapper>
      {!chartData.length && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography> No Data for selected dates..</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeekChart;
