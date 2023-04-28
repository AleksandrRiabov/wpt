import "./style.css";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridRowParams } from "@mui/x-data-grid";
import { useGetTrailersDataQuery } from "../../state/api";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { format, subDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { AddBox } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import MuiDateRangePicker from "../../components/DateRangePicker/MuiDateRangePicker";
import { DateRange } from "../../state/types";
import { formateDateRange } from "../../helpers";
import { useState } from "react";

// Default date from in the query
const today = new Date();
const defaultDateFrom = `dateFrom=${format(subDays(today, 30), "dd-MM-yyyy")}`;

const TrailersBoard = () => {
  // Use the `useState` hook to manage date range query for fetching
  const [dateRangeQuery, setDateRangeQuery] = useState(defaultDateFrom);
  const { data } = useGetTrailersDataQuery(dateRangeQuery);
  const { palette } = useTheme();
  const colors = tokens(palette.mode);
  const history = useNavigate();

  // function to handle row double-click
  const handleRowDoubleClick = (params: GridRowParams) => {
    const trailerId = params.row._id;
    history(`/trailers/details/${trailerId}`);
  };

  const trailerColumns = [
    { field: "trailerNumber", headerName: "Trailer", flex: 1 },
    { field: "loadType", headerName: "Type", flex: 1 },
    {
      field: "sentDate",
      headerName: "Sent",
      flex: 0.7,
      renderCell: (params: GridCellParams) => {
        const sentDate = params.row.sentDate;
        if (!sentDate) return "N/A";
        const formattedDate = format(new Date(sentDate), "EEE dd/MM/yy");
        return formattedDate;
      },
    },
    {
      field: "clearance",
      headerName: "Due",
      flex: 0.7,
      renderCell: (params: GridCellParams) => {
        const deliveryDate = params.row.deliveryDate;
        if (!deliveryDate) return "N/A";
        const formattedDate = format(new Date(deliveryDate), "EEE dd/MM/yy");
        return formattedDate;
      },
    },
    {
      field: "type",
      headerName: "Clearance",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        const clearance = params.row.clearance;
        if (!clearance) return "N/A";
        const formattedDate = format(new Date(clearance), "EEE dd/MM/yy");
        return formattedDate;
      },
    },
  ];

  const rowClassName = (params: GridRowParams) => {
    const { cert, alcohol, freightType } = params.row;
    return cert
      ? "certified-row"
      : alcohol
      ? "alcohol-row"
      : freightType === "Sea"
      ? "seafreight-row"
      : "";
  };

  //On change format date range and update state/query
  const handleDateRangeChange = (dateRange: DateRange) => {
    const dates = formateDateRange(dateRange);
    setDateRangeQuery(dates);
  };

  return (
    <>
      <Box color={colors.white[100]} margin="1.5rem 1rem 0 1rem">
        <FlexBetween>
          {" "}
          <Typography variant="h4" pb="5px">
            Recent trailers
          </Typography>
          <MuiDateRangePicker onDataChange={handleDateRangeChange} />
          <Link to="/trailers/add">
            {" "}
            <Typography variant="h3" color={colors.secondary[500]}>
              <AddBox fontSize="large" />
            </Typography>
          </Link>
        </FlexBetween>
      </Box>
      <Box
        mt="0.5rem"
        p="0  0.5rem"
        height="75%"
        sx={{
          "& .MuiDataGrid-root": {
            color: "",
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          rows={data || []}
          columns={trailerColumns}
          getRowClassName={rowClassName}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </Box>
      <style>
        {`
          .certified-row {
            color: ${colors.green[400]};
          }
          .seafreight-row {
            color: ${colors.secondary[500]};
          }
          .alcohol-row {
            color: red;
          }
        `}
      </style>
    </>
  );
};

export default TrailersBoard;
