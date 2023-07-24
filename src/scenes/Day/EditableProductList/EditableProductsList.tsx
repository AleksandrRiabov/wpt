import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { DataRow } from "../types";
import EditableRow from "./EditableRow";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableFooter from "./ProductsTableFooter";
import Notifications from "../../../components/Notifications/Notifications";

import {
  useGetDaysDataQuery,
  useGetOptionsDataQuery,
} from "../../../state/api";
import { GetDaysDataResponse } from "../../../state/types";
import usePostDayData from "../usePostDayData";
import useEditableProductsLogic from "./useEditableProductsLogic";

import { getDayTotals } from "./helpers";

// Props type for the component
type Props = {
  handleOpenChart: () => void;
};

const EditableProductsList = ({ handleOpenChart }: Props) => {
  // State to store the table data
  const [tableData, setTableData] = useState<DataRow[]>([]);
  const { date } = useParams();

  // Get All Possible Products from options
  const {
    data: options,
    isLoading: loadingOptions,
    isError: optionsError,
  } = useGetOptionsDataQuery();

  // Get all products data for the requested day
  const {
    data: dayData,
    isLoading: loadingDayData,
    isFetching: fetchingDayData,
    refetch: refetchDayProducts,
    isError: dayDataError,
  } = useGetDaysDataQuery(`dateFrom=${date}&dateTo=${date}&withStats=true`);
  const day = dayData?.length ? dayData[0] : ({} as GetDaysDataResponse);

  // UseEffect to refetch if date changes to avoid using cached data
  useEffect(() => {
    refetchDayProducts();
  }, [date, refetchDayProducts]);

  // Hook to Create day data / Update if the day exists
  const {
    handleCreateDay,
    handleCloseSnackbar,
    successMessage,
    errorMessage,
    updating,
  } = usePostDayData({ tableData, date });

  // Formats the tableData from options and day data and returns handle functions
  const { updateProduct } = useEditableProductsLogic({
    options,
    day,
    dayData,
    setTableData,
  });

  // Calculate day totals based on the table data
  const dayTotals = getDayTotals(tableData);

  // Determine if there is an error in fetching options or day data
  const isError = optionsError || dayDataError;
  const getRequestErrorMessage = "Error.. Please try again, later.";

  return (
    <Box minWidth="650px" position="relative">
      {/* Display the products table header */}
      <ProductsTableHeader />

      {/* Show loading or error messages or the table data */}
      {loadingOptions || loadingDayData ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          border="1px solid #dedede"
        >
          Loading...
        </Box>
      ) : isError ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          border="1px solid #dedede"
        >
          {getRequestErrorMessage}
        </Box>
      ) : (
        tableData?.map((row) => (
          <Box key={row.name}>
            <EditableRow updateProduct={updateProduct} row={row} />
          </Box>
        ))
      )}

      {/* Display the products table footer */}
      <ProductsTableFooter
        dayTotals={dayTotals}
        handleCreateDay={handleCreateDay}
        updating={updating}
        handleOpenChart={handleOpenChart}
      />

      {/* POST Request Notifications */}
      <Notifications
        handleCloseSnackbar={handleCloseSnackbar}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      {/* Display loading message when refetching data for other days */}
      {fetchingDayData && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box p="15px" sx={{ background: "rgba(0, 0, 0, 0.6)" }}>
            <strong>
              <Typography variant="h3" color="secondary">
                Please Wait..
              </Typography>
            </strong>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(EditableProductsList);
