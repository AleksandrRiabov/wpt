import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

type Props = {
  title: string;
  className: string;
};

const TrailerTitle = ({ title, className }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);
  return (
    <Box width="100%">
      <Typography variant="h2" className={className}>
        {title}
      </Typography>
      <style>
        {`
          .certified-row {
            color: ${colors.green[300]};
          }
          .seafreight-row {
            color: ${colors.secondary[500]};
          }
          .alcohol-row {
            color: red;
          }
        `}
      </style>
    </Box>
  );
};

export default TrailerTitle;
