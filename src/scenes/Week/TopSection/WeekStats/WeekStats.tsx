import { Box } from "@mui/material";
import WeekDatePicker from "./WeekDatePicker";

type Props = {
  handleChageStartDate: (newDate: Date) => void;
};

const WeekStats = ({ handleChageStartDate }: Props) => {
  return (
    <Box display="flex" justifyContent="center" padding="45px 10px">
      <WeekDatePicker handleChageStartDate={handleChageStartDate} />
    </Box>
  );
};

export default WeekStats;
