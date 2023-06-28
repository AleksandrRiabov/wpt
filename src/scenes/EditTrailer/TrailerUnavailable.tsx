import React from "react";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import { Typography } from "@mui/material";

const TrailerUnavailable = () => {
  return (
    <FlexCenterCenter>
      <Typography variant="h4">
        We're sorry, but the trailer you're trying to access is not available.
        It may have been removed or may have never existed. Please check the ID
        and try again, or contact our support team if you need further
        assistance.
      </Typography>
    </FlexCenterCenter>
  );
};

export default TrailerUnavailable;
