import { useState } from "react";

import { Box } from "@mui/system";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { addWeeks, isAfter, subWeeks } from "date-fns";

const arrowsStyle = { cursor: "pointer", fontSize: "2rem" };

type Props = {
  handleChangeStartDate: (newDate: Date) => void;
  startDate: Date | null;
};

const WeekDatePicker = ({ handleChangeStartDate, startDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(startDate);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      handleChangeStartDate(date);
    }
  };

  const handleArrowClick = (direction: string) => {
    if (!selectedDate) return;

    let newDate: Date;

    if (direction === "left") {
      newDate = subWeeks(selectedDate, 1);
    } else {
      newDate = addWeeks(selectedDate, 1);
    }

    // Check if the new date is after today, if so, don't update
    if (!isAfter(newDate, new Date())) {
      handleDateChange(newDate);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box paddingRight="10px">
        <ArrowBack
          color="secondary"
          sx={arrowsStyle}
          onClick={() => handleArrowClick("left")}
        />
      </Box>
      <Box width="160px">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Start of the Week"
            value={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            format="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </Box>
      <Box paddingLeft="10px">
        <ArrowForward
          color="secondary"
          sx={arrowsStyle}
          onClick={() => handleArrowClick("right")}
        />
      </Box>
    </Box>
  );
};

export default WeekDatePicker;
