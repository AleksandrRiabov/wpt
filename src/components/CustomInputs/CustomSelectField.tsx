import { MenuItem, TextField, Typography } from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween";

type Props = {
  value: string;
  options: string[];
  name: string;
  label: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function CustomSelectField({
  value,
  name,
  label,
  handleChange,
  options,
}: Props) {
  return (
    <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
      <Typography variant="h3">{label}</Typography>
      <TextField
        name={name}
        label={label}
        value={value}
        select
        color="secondary"
        onChange={handleChange}
        sx={{ minWidth: "200px" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FlexBetween>
  );
}

export default CustomSelectField;
