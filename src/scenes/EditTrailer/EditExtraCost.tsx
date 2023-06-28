import React from "react";
import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { countExtraCharges, formatExtraCostName } from "../../helpers";
import { GetTrailersDataResponse } from "../../state/types";
import CustomTextField from "../../components/CustomInputs/CustomTextField";

type Props = {
  extraCost: GetTrailersDataResponse["extraCost"];
  handleExtraCostChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const EditExtraCost = ({ extraCost, handleExtraCostChange }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        flex: 1,
      }}
    >
      {Object.keys(extraCost ?? {}).map((extraKey) => {
        const extra = extraCost[extraKey];
        if (!extra) {
          return null;
        }
        return (
          <CustomTextField
            key={extraKey}
            name={extraKey}
            value={extraCost?.[extraKey]?.cost || ""}
            handleChange={handleExtraCostChange}
            label="Cost"
            title={formatExtraCostName(extraKey)}
          />
        );
      })}
      <FlexBetween p="10px" sx={{ borderBottom: "1px solid #6c8991" }}>
        <Typography variant="h3">EXTRA COST:</Typography>
        <Typography variant="h3" color="red">
          £{countExtraCharges(extraCost)}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default EditExtraCost;
