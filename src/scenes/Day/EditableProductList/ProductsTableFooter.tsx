import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";

import SingleCell from "./SingleCell";
import { tokens } from "../../../theme";
import { displayTrailersAndPallets } from "./helpers";
import { Save, ShowChart } from "@mui/icons-material";

type Props = {
  dayTotals: {
    cases: number;
    pallets: number;
    expectedCases: number;
    expectedPallets: number;
  };
  handleCreateDay: () => void;
  handleOpenChart: () => void;
  updating: boolean;
};

const ProductsTableFooter = ({
  dayTotals,
  handleCreateDay,
  updating,
  handleOpenChart,
}: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const { cases, pallets, expectedCases, expectedPallets } = dayTotals;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
      }}
    >
      <Box display="flex">
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
                  <strong>{displayTrailersAndPallets(pallets)}</strong>
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
                  <strong>{expectedPallets.toFixed()}</strong>
                </Typography>
              </Tooltip>
            </SingleCell>
            <SingleCell flex="1" sx={{ background: colors.primary[400] }}>
              <Tooltip title="Total Expected Trilers">
                <Typography>
                  <strong>{displayTrailersAndPallets(expectedPallets)}</strong>
                </Typography>
              </Tooltip>
            </SingleCell>
          </Box>
          <Box p="5px" sx={{ background: colors.secondary[900] }}></Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p="30px"
        sx={{ background: colors.primary[700] }}
      >
        <Button
          onClick={handleCreateDay}
          variant="contained"
          color="secondary"
          disabled={updating}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "15px",
          }}
        >
          <Save /> {!updating ? "SAVE" : "PLEASE WAIT"}
        </Button>
        <Button
          onClick={handleOpenChart}
          variant="contained"
          color="secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "15px",
          }}
        >
          <ShowChart />
          Open Chart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsTableFooter;
