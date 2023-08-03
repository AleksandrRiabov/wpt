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
  handleDateRangeChange: (dateRange: DateRange) => void;
  handleChageStartDate: (newDate: Date) => void;
};

const TopSection = ({
  chartData,
  data,
  dateRangeQuery,
  defaultCategory,
  defaultDateTo,
  checkedProducts,
  setCheckedProducts,
  handleDateRangeChange,
  handleChageStartDate,
}: Props) => {
  console.log("Render Top section");

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: { xs: "column-reverse", md: "row" },
        height: { xs: "400px", sm: "450px", md: "500px", lg: "600px" },
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
          handleDateRangeChange={handleDateRangeChange}
        />
      </DashboardBox>
      <DashboardBox flex="1">
        <WeekStats handleChageStartDate={handleChageStartDate} />
      </DashboardBox>
    </Box>
  );
};

export default TopSection;
