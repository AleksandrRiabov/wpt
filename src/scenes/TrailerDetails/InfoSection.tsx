import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { format } from "date-fns";
import { GetTrailersDataResponse } from "../../state/types";
import TrailerTitle from "../../components/TrailerTitle/TrailerTitle";
import { tokens } from "../../theme";
import { countExtraCharges } from "../../helpers";

type Props = {
  trailer: GetTrailersDataResponse;
};

const InfoSection = ({ trailer }: Props) => {
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
            lg: "column",
          },
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            flex: 1,
          }}
        >
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Reference:</Typography>
            <Typography variant="h3">{trailer?.reference}</Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Sent Date:</Typography>
            <Typography variant="h3">
              {trailer?.sentDate &&
                format(new Date(trailer?.sentDate), "EEE dd/MM/yy")}
            </Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">For Delivery</Typography>
            <Typography variant="h3">
              {trailer?.deliveryDate &&
                format(new Date(trailer?.deliveryDate), "EEE dd/MM/yy")}
            </Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Clearance</Typography>
            <Typography variant="h3">
              {trailer?.clearance
                ? format(new Date(trailer?.clearance), "dd/MM/yy hh:mm")
                : "-"}
            </Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Received:</Typography>
            <Typography variant="h3">
              {trailer?.received
                ? format(new Date(trailer?.received), "EEE dd/MM/yy")
                : "-"}
            </Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Freight Type:</Typography>
            <Typography variant="h3">{trailer?.freightType}</Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">Certified:</Typography>
            <Typography variant="h3">{trailer?.cert ? "Yes" : "No"}</Typography>
          </FlexBetween>
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3"> Has Alcohol:</Typography>
            <Typography variant="h3">
              {trailer?.alcohol ? "Yes" : "No"}
            </Typography>
          </FlexBetween>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            flex: 1,
          }}
        >
          <FlexBetween p="7px" sx={{ borderBottom: "1px solid #6c8991" }}>
            <Typography variant="h3">ExtraCost:</Typography>
            <Typography variant="h3" color="red">
              £{countExtraCharges(trailer?.extraCost)}
            </Typography>
          </FlexBetween>
          {Object.keys(trailer?.extraCost ?? {})
            .filter((extrakey) => trailer?.extraCost[extrakey]?.cost)
            .map((extraKey) => {
              const extra = trailer.extraCost[extraKey];
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
                    p="7px"
                    sx={{ borderBottom: "1px solid #6c8991" }}
                  >
                    <Typography variant="h4">{extraKey}</Typography>
                    <Typography color={extra.cost > 0 ? "red" : ""}>
                      Cost: £{extra.cost}
                    </Typography>
                  </FlexBetween>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
