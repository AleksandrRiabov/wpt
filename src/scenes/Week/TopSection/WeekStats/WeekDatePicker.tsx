import { useEffect, useState } from "react";

import { Box } from "@mui/system";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { addWeeks, isAfter, subWeeks } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { getStartOfWeekDate } from "../../../../helpers";

const arrowsStyle = { cursor: "pointer", fontSize: "2rem" };

type Props = {
  startDate: Date | null;
};

const WeekDatePicker = ({ startDate }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(startDate);

  // UseEffect to synchronize the selectedDate state with the startDate prop
  useEffect(() => {
    setSelectedDate(startDate);
  }, [startDate]);

  const navigate = useNavigate();

  // Handler for date change in the date picker
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      // Navigate to the new week's start date
      navigate(`/week/${getStartOfWeekDate(date)}`);
    }
  };

  // Handler for arrow button clicks
  const handleArrowClick = (direction: string) => {
    if (!selectedDate) return;

    let newDate: Date;

    // Calculate the new date based on the arrow direction
    if (direction === "left") {
      newDate = subWeeks(selectedDate, 1);
    } else {
      newDate = addWeeks(selectedDate, 1);
    }

    // Check if the new date is after today, if so, navigate to the new week's start date
    if (!isAfter(newDate, new Date())) {
      navigate(`/week/${getStartOfWeekDate(newDate)}`);
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
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            format="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </Box>
      <Box paddingLeft="10px">
        <Link to={`/week/${3}`}></Link>
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
