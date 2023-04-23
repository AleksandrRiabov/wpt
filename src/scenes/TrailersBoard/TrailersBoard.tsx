import "./style.css";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridRowParams } from "@mui/x-data-grid";
import BoxHeader from "../../components/BoxHeader/BoxHeader";
import { useGetTrailersDataQuery } from "../../state/api";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const TrailersBoard = () => {
  const { data } = useGetTrailersDataQuery("sentDateFrom=2022-12-31");
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

  return (
    <>
      <BoxHeader title="Recent trailers" subtitle={"123"} />
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
