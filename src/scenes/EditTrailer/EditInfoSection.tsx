import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import {
  GetOptionsDataResponse,
  GetTrailersDataResponse,
} from "../../state/types";
import CustomTextField from "../../components/CustomInputs/CustomTextField";
import CustomSelectField from "../../components/CustomInputs/CustomSelectField";
import CustomDatePicker from "../../components/CustomInputs/CustomDatePicker";

type Props = {
  trailer: GetTrailersDataResponse | undefined;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleDateChange: (
    key: "sentDate" | "deliveryDate" | "clearance" | "received",
    date: Date | null
  ) => void;
  handleCheckbox: (name: "alcohol" | "cert") => void;
  handleExtraCostChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  options: GetOptionsDataResponse;
};

const EditInfoSection = ({
  trailer,
  handleChange,
  handleDateChange,
  handleCheckbox,
  options,
}: Props) => {
  return (
    <Box
      width="100%"
      sx={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Trailer Number */}
        <CustomTextField
          label="Trailer Number"
          name="trailerNumber"
          value={trailer?.trailerNumber || ""}
          handleChange={handleChange}
        />
        {/* Load Type */}
        <CustomSelectField
          name="loadType"
          label="Load Type"
          value={trailer?.loadType || ""}
          handleChange={handleChange}
          options={options.loadType || []}
        />
        {/* Reference */}
        <CustomTextField
          label="Reference"
          name="reference"
          value={trailer?.reference || ""}
          handleChange={handleChange}
        />
        {/* Sent Date */}
        <CustomDatePicker
          value={trailer?.sentDate}
          handleDateChange={handleDateChange}
          label="Select Date"
          format="dd-MM-yyyy"
          name="sentDate"
          title="Sent Date"
        />
        {/* Delivery Date */}
        <CustomDatePicker
          value={trailer?.deliveryDate}
          handleDateChange={handleDateChange}
          label="Select Date"
          format="dd-MM-yyyy"
          name="deliveryDate"
          title="Delivery Date"
        />
        {/* Clearance Date */}
        <CustomDatePicker
          value={trailer?.clearance}
          handleDateChange={handleDateChange}
          label="Select Date and Time"
          format="dd-MM-yyyy HH:mm:ss"
          name="clearance"
          title="Clearance"
        />
        {/* Received Date */}
        <CustomDatePicker
          value={trailer?.received || undefined}
          handleDateChange={handleDateChange}
          label="Select Date and Time"
          format="dd-MM-yyyy HH:mm:ss"
          name="received"
          title="Received"
        />
        {/* Freight Type */}
        <CustomSelectField
          name="freightType"
          label="Freight Type"
          value={trailer?.freightType || ""}
          handleChange={handleChange}
          options={options.freightType || []}
        />
        {/* Contractor */}
        <CustomSelectField
          name="contractor"
          label="Contractor"
          value={trailer?.contractor || ""}
          handleChange={handleChange}
          options={options.contractor || []}
        />
        {/* Certified */}
        <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
          <Typography variant="h3">Certified:</Typography>
          <FormControlLabel
            control={<Checkbox checked={trailer?.cert || false} />}
            label="Certified"
            onChange={() => handleCheckbox("cert")}
          />
        </FlexBetween>
        {/* Alcohol */}
        <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
          <Typography variant="h3"> Has Alcohol:</Typography>
          <FormControlLabel
            control={<Checkbox checked={trailer?.alcohol || false} />}
            label="Alcohol"
            onChange={() => handleCheckbox("alcohol")}
          />
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default EditInfoSection;
