import { Typography } from "@mui/material";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";

type Props = {
  isErrorTrailerData: boolean;
};

const ErrorMessage = ({ isErrorTrailerData }: Props) => {
  return (
    <FlexCenterCenter height="90vh">
      <Typography variant="h4">
        {isErrorTrailerData
          ? "Error.. Could not get trailer details. Please Try again later.."
          : "Error.. Could not get options. Please Try again later.."}
      </Typography>
    </FlexCenterCenter>
  );
};

export default ErrorMessage;
