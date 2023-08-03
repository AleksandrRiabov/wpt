import React, { useState } from "react";

import { Box } from "@mui/system";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type Props = {
  handleChageStartDate: (newDate: Date) => void;
};

const WeekDatePicker = ({ handleChageStartDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      handleChageStartDate(date);
    }
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Start of the Week"
          value={selectedDate}
          onChange={handleDateChange}
          maxDate={new Date()}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default WeekDatePicker;
