import { Box } from "@mui/material";
import { styled } from "@mui/system";

const SingleCell = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary[500]
      : theme.palette.primary[200],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  minWidth: "80px",
}));

export default SingleCell;
