import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import { Box } from "@mui/material";
import DayRow from "./DayRow";

type Props = {};

const WeekTable = (props: Props) => {
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
          date="31-07-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
        />
        <DayRow
          day="Tuesday"
          date="01-08-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
        />
        <DayRow
          day="Wednesaday"
          date="02-08-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
        />
        <DayRow
          day="Thursday"
          date="03-08-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
        />
        <DayRow
          day="Friday"
          date="04-08-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
        />
        <DayRow
          day="Saturday"
          date="05-08-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
        />
        <DayRow
          day="Sunday"
          date="06-08-2023"
          cases="98768"
          pallets="198"
          withBtn={true}
          isLastRow={true}
        />
      </Box>
    </DashboardBox>
  );
};

export default WeekTable;
