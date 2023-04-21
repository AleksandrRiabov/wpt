import "./style.css";
import { Box } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import BoxHeader from "../../../../components/BoxHeader/BoxHeader";
import { useGetTrailersDataQuery } from "../../../../state/api";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import useFormatTrailersData from "../../../../hooks/useFormatTrailersData";

type Props = {};

const TrailersBoard = (props: Props) => {
  const { data } = useGetTrailersDataQuery("sentDateFrom=2022-12-31");
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const formatedData = useFormatTrailersData(data);
  console.log(formatedData);

  const trailerColumns = [
    { field: "trailerNumber", headerName: "Trailer", flex: 1 },
    { field: "loadType", headerName: "Type", flex: 1 },
    { field: "sentDate", headerName: "Sent", flex: 0.7 },
    { field: "deliveryDate", headerName: "Due", flex: 0.7 },
    { field: "type", headerName: "Clearance", flex: 1 },
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
          rows={formatedData || []}
          columns={trailerColumns}
          getRowClassName={rowClassName}
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
