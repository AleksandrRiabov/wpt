import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import {
  GetOptionsDataResponse,
  GetTrailersDataResponse,
} from "../../state/types";
import TrailerTitle from "../../components/TrailerTitle/TrailerTitle";
import { tokens } from "../../theme";
import CustomTextField from "../../components/CustomInputs/CustomTextField";
import CustomSelectField from "../../components/CustomInputs/CustomSelectField";
import EditExtraCost from "./EditExtraCost";
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
  handleExtraCostChange,
  options,
}: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Box
      p="20px"
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: {
          xs: "center",
        },
        flexDirection: "column",
      }}
    >
      <TrailerTitle
        title={`${trailer?.trailerNumber} -  ${trailer?.loadType}`}
        className={
          trailer?.cert
            ? "certified-row"
            : trailer?.alcohol
            ? "alcohol-row"
            : trailer?.freightType === "Sea"
            ? "seafreight-row"
            : ""
        }
      />
      <Box
        color={colors.white[100]}
        pt="20px"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-around",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* ========= Left Side ======== */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            flex: 1,
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
            tytle="Sent Date"
          />
          {/* Delivery Date */}
          <CustomDatePicker
            value={trailer?.deliveryDate}
            handleDateChange={handleDateChange}
            label="Select Date"
            format="dd-MM-yyyy"
            name="deliveryDate"
            tytle="Delivery Date"
          />
          {/* Clearance Date */}
          <CustomDatePicker
            value={trailer?.clearance}
            handleDateChange={handleDateChange}
            label="Select Date and Time"
            format="dd-MM-yyyy HH:mm:ss"
            name="clearance"
            tytle="Clearance"
          />
          {/* Received Date */}
          <CustomDatePicker
            value={trailer?.received || undefined}
            handleDateChange={handleDateChange}
            label="Select Date and Time"
            format="dd-MM-yyyy HH:mm:ss"
            name="received"
            tytle="Received"
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
        {/* ========= Right Side ====== */}
        <Box>
          {/* Extra Cost */}
          <EditExtraCost
            handleExtraCostChange={handleExtraCostChange}
            extraCost={trailer?.extraCost || {}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditInfoSection;
