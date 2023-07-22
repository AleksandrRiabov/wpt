import { Box, Typography } from "@mui/material";
import { DataRow } from "../types";
import EditableRow from "./EditableRow";
import { memo, useEffect, useState } from "react";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableFooter from "./ProductsTableFooter";

import {
  useGetDaysDataQuery,
  useGetOptionsDataQuery,
} from "../../../state/api";
import { GetDaysDataResponse } from "../../../state/types";
import { getDayTotals } from "./helpers";
import { useParams } from "react-router-dom";
import usePostDayData from "../usePostDayData";
import Notifications from "../../../components/Notifications/Notifications";
import useEditableProductsLogic from "./useEditableProductsLogic";

type Props = {
  handleOpenChart: () => void;
};

const EditableProductsList = ({ handleOpenChart }: Props) => {
  const [tableData, setTableData] = useState<DataRow[]>([]);
  const { date } = useParams();

  // Get All Possible Products from options
  const {
    data: options,
    isLoading: loadingOptions,
    isError: optionsError,
  } = useGetOptionsDataQuery();

  // Get all products data for requested day
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

  // Hook to Create day data / Update if day exists
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

  const dayTotals = getDayTotals(tableData);

  const isError = optionsError || dayDataError;
  const getRequestErrorMessage = "Error.. Please try again, later.";

  return (
    <Box
      sx={{
        overflowX: "auto",
      }}
    >
      <Box minWidth="600px" position="relative">
        <ProductsTableHeader />
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
        {/* Display loading message when refetch other day */}
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
    </Box>
  );
};

export default memo(EditableProductsList);
