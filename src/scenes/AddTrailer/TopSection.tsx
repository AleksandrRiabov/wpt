import { Grid, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { GetOptionsDataResponse } from "../../state/types";
import FlexBetween from "../../components/FlexBetween/FlexBetween";

import { FormState } from "./types";

type ValidationError = { error: boolean; message: string };

type Props = {
  formState: FormState;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  trailerNumberError: ValidationError;
  loadTypeError: ValidationError;
  options: GetOptionsDataResponse | undefined;
  handleDateChange: (
    key: "sentDate" | "deliveryDate",
    date: Date | null
  ) => void;
};

const TopSection = ({
  formState,
  handleChange,
  trailerNumberError,
  loadTypeError,
  options,
  handleDateChange,
}: Props) => {
  return (
    <>
      {/* Trailer Number */}
      <Grid item xs={12} sm={6}>
        <TextField
          autoFocus={true}
          autoComplete="off"
          autoCapitalize="characters"
          name="trailerNumber"
          label="Trailer Number"
          value={formState.trailerNumber}
          color="secondary"
          fullWidth
          onChange={handleChange}
          error={trailerNumberError?.error}
          helperText={trailerNumberError?.message}
        />
      </Grid>

      {/* Load Type */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="loadType"
          label="Load Type"
          value={formState.loadType}
          color="secondary"
          fullWidth
          select
          onChange={handleChange}
          error={loadTypeError?.error}
          helperText={loadTypeError?.message}
        >
          {options?.loadType.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Contractor */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="contractor"
          label="Contractor"
          value={formState.contractor}
          fullWidth
          color="secondary"
          select
          onChange={handleChange}
        >
          {options?.contractor.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Date Pickers */}
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FlexBetween>
            {/* Sent Date */}
            <DatePicker
              label="Sent Date"
              value={formState.sentDate}
              onChange={(date) => handleDateChange("sentDate", date)}
              format="dd/MM/yyyy"
            />
            {/* Delivery Date */}
            <DatePicker
              label="For Delivery"
              value={formState.deliveryDate}
              onChange={(date) => handleDateChange("deliveryDate", date)}
              format="dd/MM/yyyy"
            />
          </FlexBetween>
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default TopSection;
