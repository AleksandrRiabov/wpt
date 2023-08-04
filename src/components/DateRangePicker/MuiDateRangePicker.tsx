import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import FlexBetween from "../FlexBetween/FlexBetween";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface Props {
  onDateChange: (dateRange: DateRange) => void;
  sessionStorageKey: string;
}

function MuiDateRangePicker({ onDateChange, sessionStorageKey }: Props) {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const storedDateRange = sessionStorage?.getItem(
      `${sessionStorageKey}dateRange`
    );
    if (!storedDateRange) return { from: null, to: null };
    const parsedRange = JSON.parse(storedDateRange);
    const dateFrom = new Date(parsedRange.from);
    const dateTo = new Date(parsedRange.to);
    return { from: dateFrom, to: dateTo };
  });

  const handleDateChange = (key: keyof DateRange, date: Date | null) => {
    if (date && !isNaN(Date.parse(date.toString()))) {
      const newDateRange = {
        ...dateRange,
        [key]: date,
      };
      setDateRange(newDateRange);
      sessionStorage.setItem(
        `${sessionStorageKey}dateRange`,
        JSON.stringify(newDateRange)
      );
    }
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      onDateChange(dateRange);
    }
  }, [dateRange, onDateChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FlexBetween>
        <Box width={"45%"}>
          <DatePicker
            autoFocus={true}
            label="From"
            value={dateRange.from}
            onChange={(date) => handleDateChange("from", date)}
            format="dd/MM/yyyy"
          />
        </Box>
        <Box width={"45%"}>
          <DatePicker
            label="To"
            value={dateRange.to}
            onChange={(date) => handleDateChange("to", date)}
            format="dd/MM/yyyy"
          />
        </Box>
      </FlexBetween>
    </LocalizationProvider>
  );
}

export default MuiDateRangePicker;
