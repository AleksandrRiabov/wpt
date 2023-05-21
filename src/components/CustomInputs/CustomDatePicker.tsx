import { Typography } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FlexBetween from "../FlexBetween/FlexBetween";

type Name = "received" | "clearance" | "sentDate" | "deliveryDate";

type Props = {
  value: Date | undefined;
  handleDateChange: (key: Name, date: Date | null) => void;
  label: string;
  format: string;
  name: Name;
  title: string;
};

function CustomDatePicker({
  name,
  value,
  handleDateChange,
  label,
  title,
  format,
}: Props) {
  return (
    <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
      <Typography variant="h3">{title}</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* Display correct Picker deppending ot required format */}
        {format.length > 11 ? (
          <DateTimePicker
            value={new Date(value || "")}
            onChange={(date) => handleDateChange(name, date)}
            label={label}
            format={format}
          />
        ) : (
          <DatePicker
            value={new Date(value || "")}
            onChange={(date) => handleDateChange(name, date)}
            label={label}
            format={format}
          />
        )}
      </LocalizationProvider>
    </FlexBetween>
  );
}

export default CustomDatePicker;
