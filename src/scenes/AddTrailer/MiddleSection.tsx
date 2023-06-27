import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { GetOptionsDataResponse } from "../../state/types";
import { FormState } from "./types";
type ValidationError = { error: boolean; message: string };

type Props = {
  formState: FormState;
  referenceError: ValidationError;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  options: GetOptionsDataResponse | undefined;
  handleCheckbox: (name: "alcohol" | "cert") => void;
};

const MiddleSection = ({
  formState,
  options,
  handleChange,
  handleCheckbox,
  referenceError,
}: Props) => {
  return (
    <>
      {/* Rereference Number */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="reference"
          label="Reference"
          value={formState.reference}
          fullWidth
          onChange={handleChange}
          disabled={formState.contractor === "JCARRION"}
          error={referenceError?.error}
          helperText={referenceError?.message}
        />
      </Grid>

      {/* Freight Type */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="freightType"
          label="Freight Type"
          value={formState.freightType}
          fullWidth
          select
          onChange={handleChange}
        >
          {options?.freightType?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Alocohol */}
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={<Checkbox checked={formState.alcohol} />}
          label="Alcohol"
          onChange={() => handleCheckbox("alcohol")}
        />
      </Grid>

      {/* Certified */}
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={<Checkbox checked={formState.cert} />}
          label="Cert"
          onChange={() => handleCheckbox("cert")}
        />
      </Grid>

      {/* Crossed */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="crossed"
          label="Crossed"
          value={formState.crossed}
          fullWidth
          select
          onChange={handleChange}
        >
          {options?.crossed.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Comments Input */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="comments"
          label="Comments"
          value={formState.comments}
          fullWidth
          multiline
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};

export default MiddleSection;
