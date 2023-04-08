import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween";
import { tokens } from "../../theme";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  sideText?: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <FlexBetween color={colors.white[100]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6" mb="-0.1rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween>
        <Typography variant="h5" fontWeight="700" color={colors.secondary[500]}>
          {sideText}
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default BoxHeader;
