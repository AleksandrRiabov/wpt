import { TextField, Typography } from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween";

type Props = {
  value: number | string;
  name: string;
  label: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

function CustomTextField({ value, name, label, handleChange }: Props) {
  return (
    <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
      <Typography variant="h3">Trailer Number:</Typography>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </FlexBetween>
  );
}

export default CustomTextField;
