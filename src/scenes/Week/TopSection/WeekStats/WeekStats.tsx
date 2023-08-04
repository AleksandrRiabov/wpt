import { Box } from "@mui/material";
import WeekDatePicker from "./WeekDatePicker";

type Props = {
  handleChangeStartDate: (newDate: Date) => void;
  startDate: Date | null;
};

const WeekStats = ({ handleChangeStartDate, startDate }: Props) => {
  return (
    <Box display="flex" justifyContent="center" padding="45px 10px">
      <WeekDatePicker
        handleChangeStartDate={handleChangeStartDate}
        startDate={startDate}
      />
    </Box>
  );
};

export default WeekStats;
