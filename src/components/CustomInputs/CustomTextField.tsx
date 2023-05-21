import { TextField, Typography } from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween";

type Props = {
  value: number | string;
  name: string;
  label: string;
  title?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

function CustomTextField({ value, name, label, handleChange, title }: Props) {
  return (
    <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
      <Typography variant="h3">{title || label}</Typography>
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
