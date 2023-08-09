import { Box, Tooltip, Typography } from "@mui/material";
import WeekDatePicker from "./WeekDatePicker";
import StatsLine from "./StatsLine";
import { WarningAmberOutlined } from "@mui/icons-material";

type Props = {
  startDate: Date | null;
  weekStats: {
    totalCases: number;
    totalPallets: number;
    averageCases: number;
    averagePallets: number;
  };
  filtersApplied: boolean;
};

const WeekStats = ({ startDate, weekStats, filtersApplied }: Props) => {
  const { totalCases, totalPallets, averageCases, averagePallets } = weekStats;

  const averageCasesPerPallet = averageCases / averagePallets;

  return (
    <Box>
      {/* Date picker */}
      <Box display="flex" justifyContent="center" padding="45px 10px">
        <WeekDatePicker startDate={startDate} />
      </Box>

      {/* Week stats Bloks */}
      <Box
        sx={{
          display: { xs: "block", sm: "flex", md: "block" },
          justifyContent: "space-around",
        }}
      >
        <Box width="100%">
          <Typography variant="h2" textAlign="center">
            Week Total:
          </Typography>
          <Box width="80%" margin="10px auto">
            <StatsLine title="Cases" value={totalCases} />
            <StatsLine title="Pallets" value={totalPallets} />
          </Box>
        </Box>

        <Box sx={{ marginTop: { xs: "20px", sm: "0" }, width: "100%" }}>
          <Typography variant="h2" textAlign="center">
            Day Average:
          </Typography>
          <Box width="80%" margin="10px auto">
            <StatsLine title="Cases" value={averageCases} />
            <StatsLine title="Pallets" value={averagePallets} />
            <StatsLine title="Cases / Pallet" value={averageCasesPerPallet} />
          </Box>
        </Box>
      </Box>
      {filtersApplied && (
        <Tooltip title="The displayed data reflects the selected products. For results involving all products, deselect all categories in the chart filter settings.">
          <Box
            display="flex"
            justifyContent="center"
            padding="15px"
            sx={{ color: "red" }}
          >
            <WarningAmberOutlined />{" "}
            <Typography paddingLeft="7px">Some Filters Applied</Typography>
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default WeekStats;
