import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { GetTrailersDataResponse } from "../../state/types";
import TrailerTitle from "../../components/TrailerTitle/TrailerTitle";
import { tokens } from "../../theme";
import { countExtraCharges, formatExtraCostName } from "../../helpers";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
};

const options = {
  loadTypes: [
    "Ambient",
    "Frozen",
    "Chill",
    "Produce",
    "Frozen / Ambient",
    "Frozen / Chill",
    "Frozen / Produce",
    "Chill / Ambient",
  ],
  freightTypes: ["Road", "Sea", "Air"],
  crossed: ["Tunnel", "Ferry"],
  contractor: ["JCARRION", "Yusen Logistics"],
};

const EditInfoSection = ({
  trailer,
  handleChange,
  handleDateChange,
  handleCheckbox,
  handleExtraCostChange,
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
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            flex: 1,
          }}
        >
          {/* Reference */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Reference:</Typography>
            <TextField
              label="Reference"
              name="reference"
              value={trailer?.reference || ""}
              onChange={handleChange}
            />
          </FlexBetween>
          {/* Sent Date */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Sent Date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FlexBetween>
                <DatePicker
                  label="Sent Date"
                  value={new Date(trailer?.sentDate || "")}
                  onChange={(date) => handleDateChange("sentDate", date)}
                  format="dd/MM/yyyy"
                />
              </FlexBetween>
            </LocalizationProvider>
          </FlexBetween>
          {/* Delivery Date */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Delivery Date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FlexBetween>
                <DatePicker
                  label="Delivery Date"
                  value={new Date(trailer?.deliveryDate || "")}
                  onChange={(date) => handleDateChange("deliveryDate", date)}
                  format="dd/MM/yyyy"
                />
              </FlexBetween>
            </LocalizationProvider>
          </FlexBetween>
          {/* Clearance Date */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Clearance</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={new Date(trailer?.clearance || "")}
                onChange={(date) => handleDateChange("clearance", date)}
                label="Select Date and Time"
                ampm={false}
                format="dd-MM-yyyy hh:mm:ss"
              />
            </LocalizationProvider>
          </FlexBetween>
          {/* Received Date */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Received</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={new Date(trailer?.received || "")}
                onChange={(date) => handleDateChange("received", date)}
                label="Select Date and Time"
                ampm={false}
                format="dd-MM-yyyy hh:mm:ss"
              />
            </LocalizationProvider>
          </FlexBetween>
          {/* Freight Type */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Freight Type:</Typography>
            <TextField
              name="freightType"
              label="Freight Type"
              value={trailer?.freightType || ""}
              select
              onChange={handleChange}
              sx={{ minWidth: "200px" }}
            >
              {options.freightTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FlexBetween>
          {/* Contractor */}
          <FlexBetween p="10px 0" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Contractor:</Typography>
            <TextField
              name="contractor"
              label="Contractor"
              value={trailer?.contractor || ""}
              select
              onChange={handleChange}
              sx={{ minWidth: "200px" }}
            >
              {options.contractor.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FlexBetween>
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

        {/* Extra Cost */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            flex: 1,
          }}
        >
          {Object.keys(trailer?.extraCost ?? {}).map((extraKey) => {
            const extra = trailer?.extraCost[extraKey];
            if (!extra) {
              return null;
            }
            return (
              <Box
                key={extraKey}
                display="flex"
                sx={{ flexDirection: "column" }}
              >
                <FlexBetween
                  p="10px"
                  sx={{ borderBottom: "1px solid #6c8991" }}
                >
                  <Typography variant="h4">
                    {formatExtraCostName(extraKey)}
                  </Typography>
                  <TextField
                    name={extraKey}
                    value={trailer?.extraCost?.[extraKey]?.cost || ""}
                    onChange={handleExtraCostChange}
                  />
                </FlexBetween>
              </Box>
            );
          })}
          <FlexBetween p="10px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">ExtraCost:</Typography>
            <Typography variant="h3" color="red">
              £{countExtraCharges(trailer?.extraCost)}
            </Typography>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default EditInfoSection;
