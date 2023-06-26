import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween";
import { tokens } from "../../theme";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  handleOpen?: () => void;
};

const BoxHeader = ({ icon, title, subtitle, handleOpen }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Box>
      <FlexBetween color={colors.white[100]} margin="1.5rem 1rem 0 1rem">
        <FlexBetween>
          {icon}
          <Box width="100%">
            <Tooltip title="Selected Products / Categories">
              <Typography variant="h4" mb="-0.1rem">
                {title}
              </Typography>
            </Tooltip>
            <Typography variant="h6" mb="-0.1rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <Typography
            variant="h5"
            fontWeight="700"
            color={colors.secondary[500]}
          >
            <Tooltip title="Open Chart Settings">
              <FlexBetween onClick={handleOpen} sx={{ cursor: "pointer" }}>
                <SettingsIcon />
                Settings{" "}
              </FlexBetween>
            </Tooltip>
          </Typography>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default BoxHeader;
