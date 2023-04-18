import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface Props {
  onDataChange: (dateRange: DateRange) => void;
}

function MuiDateRangePicker({ onDataChange }: Props) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  const handleDateChange = (key: keyof DateRange, date: Date | null) => {
    setDateRange((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      onDataChange(dateRange);
    }
  }, [dateRange, onDataChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <DatePicker
          label="From"
          value={dateRange.from}
          onChange={(date) => handleDateChange("from", date)}
        />
        <DatePicker
          label="To"
          value={dateRange.to}
          onChange={(date) => handleDateChange("to", date)}
        />
      </Box>
    </LocalizationProvider>
  );
}

export default MuiDateRangePicker;
