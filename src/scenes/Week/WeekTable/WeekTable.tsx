import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import { Box } from "@mui/material";
import DayRow from "./DayRow";

type Props = {
  data: {
    cases: number;
    pallets: number;
    date: string;
  }[];
};

const WeekTable = ({ data }: Props) => {
  return (
    <DashboardBox marginTop="20px">
      <Box sx={{ overflowX: "auto", padding: { xs: "20px", md: "30px" } }}>
        <DayRow
          day="DAY"
          date="DATE"
          cases="CASES"
          pallets="PALLETS"
          isHeader={true}
        />
        <DayRow
          day="Monday"
          date={data[0].date}
          cases={data[0].cases}
          pallets={data[0].pallets}
          withBtn={true}
        />
        <DayRow
          day="Tuesday"
          date={data[1].date}
          cases={data[1].cases}
          pallets={data[1].pallets}
          withBtn={true}
        />
        <DayRow
          day="Wednesaday"
          date={data[2].date}
          cases={data[2].cases}
          pallets={data[2].pallets}
          withBtn={true}
        />
        <DayRow
          day="Thursday"
          date={data[3].date}
          cases={data[3].cases}
          pallets={data[3].pallets}
          withBtn={true}
        />
        <DayRow
          day="Friday"
          date={data[4].date}
          cases={data[4].cases}
          pallets={data[4].pallets}
          withBtn={true}
        />
        <DayRow
          day="Saturday"
          date={data[5].date}
          cases={data[5].cases}
          pallets={data[5].pallets}
          withBtn={true}
        />
        <DayRow
          day="Sunday"
          date={data[6].date}
          cases={data[6].cases}
          pallets={data[6].pallets}
          withBtn={true}
          isLastRow={true}
        />
      </Box>
    </DashboardBox>
  );
};

export default WeekTable;
