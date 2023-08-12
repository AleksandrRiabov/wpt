import { Box } from "@mui/material";
import WeekChart from "./WeekChart";
import WeekStats from "./WeekStats/WeekStats";
import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import { DateRange, GetDaysDataResponse } from "../../../state/types";

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
  isFetching: boolean;
  startDate: Date | null;
  weekStats: {
    totalCases: number;
    totalPallets: number;
    averageCases: number;
    averagePallets: number;
  };
  filtersApplied: boolean;
};

const TopSection = ({
  chartData,
  data,
  dateRangeQuery,
  defaultCategory,
  defaultDateTo,
  checkedProducts,
  setCheckedProducts,
  isFetching,
  startDate,
  weekStats,
  filtersApplied,
}: Props) => {
  console.log("Render Top section");

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: { xs: "column-reverse", md: "row" },
      }}
    >
      <DashboardBox sx={{ flex: { xs: 1, sm: 2, md: 3, lg: 3 } }}>
        <WeekChart
          chartData={chartData}
          data={data}
          dateRangeQuery={dateRangeQuery}
          defaultCategory={defaultCategory}
          defaultDateTo={defaultDateTo}
          checkedProducts={checkedProducts}
          setCheckedProducts={setCheckedProducts}
          isFetching={isFetching}
        />
      </DashboardBox>
      <DashboardBox flex="1">
        <WeekStats
          startDate={startDate}
          weekStats={weekStats}
          filtersApplied={filtersApplied}
        />
      </DashboardBox>
    </Box>
  );
};

export default TopSection;
