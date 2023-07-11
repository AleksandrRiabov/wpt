import { Box, Tooltip, Typography, useTheme } from "@mui/material";

import SingleCell from "./SingleCell";
import { tokens } from "../../../theme";

type Props = {
  dayTotals: {
    cases: number;
    pallets: number;
    trailers: number;
    expectedCases: number;
    expectedPallets: number;
    expectedTrailers: number;
  };
};

const ProductsTableFooter = ({ dayTotals }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const {
    cases,
    pallets,
    trailers,
    expectedCases,
    expectedPallets,
    expectedTrailers,
  } = dayTotals;

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
      }}
    >
      <Box flex="1" sx={{ color: colors.secondary[500] }}>
        <Box display="flex" flex="1">
          <SingleCell flex="1" sx={{ background: colors.primary[700] }}>
            <Typography>
              <strong>TOTAL:</strong>
            </Typography>
          </SingleCell>
          {/* Actual Data */}
          <SingleCell
            flex="1"
            sx={{
              borderLeft: `1px solid ${colors.primary[400]}`,
              height: "60px",
            }}
          >
            <Tooltip title="Total Cases">
              <Typography>
                <strong>{cases}</strong>
              </Typography>
            </Tooltip>
          </SingleCell>
          <SingleCell flex="1">
            <Tooltip title="Total Pallets">
              <Typography>
                <strong>{pallets}</strong>
              </Typography>
            </Tooltip>
          </SingleCell>
          <SingleCell flex="1" sx={{ background: colors.primary[400] }}>
            <Tooltip title="Total Trailers">
              <Typography>
                <strong>{trailers}</strong>
              </Typography>
            </Tooltip>
          </SingleCell>
        </Box>
        <Box p="5px" sx={{ background: colors.secondary[500] }}></Box>
      </Box>
      {/* Expected data */}
      <Box flex="1" sx={{ color: colors.secondary[500] }}>
        <Box display="flex" flex="1">
          <SingleCell flex="1" sx={{ height: "60px" }}>
            <Tooltip title="Total Expected Cases">
              <Typography>
                <strong>{expectedCases}</strong>
              </Typography>
            </Tooltip>
          </SingleCell>
          <SingleCell flex="1">
            <Tooltip title="Total Expected Pallets">
              <Typography>
                <strong>{expectedPallets}</strong>
              </Typography>
            </Tooltip>
          </SingleCell>
          <SingleCell flex="1" sx={{ background: colors.primary[400] }}>
            <Tooltip title="Total Expected Trilers">
              <Typography>
                <strong>{expectedTrailers}</strong>
              </Typography>
            </Tooltip>
          </SingleCell>
        </Box>
        <Box p="5px" sx={{ background: colors.secondary[900] }}></Box>
      </Box>
    </Box>
  );
};

export default ProductsTableFooter;
