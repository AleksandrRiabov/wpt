import { Typography, useTheme } from "@mui/material";
import CountUp from "react-countup";
import { tokens } from "../../../theme";

type Props = {
  label: string;
  value: number;
  currency?: string;
  color?: string;
  decimals?: number;
};

const SingleStatsLine = ({
  label,
  value,
  color,
  currency,
  decimals,
}: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const spanColor = color ? color : colors.secondary[500];
  return (
    <Typography variant="h3" padding="5px">
      {label}{" "}
      <Typography variant="h3" component="span" sx={{ color: spanColor }}>
        {currency}
        <CountUp
          start={0}
          end={value}
          duration={1.5}
          separator=","
          decimal="."
          decimals={decimals || 0}
        />
      </Typography>
    </Typography>
  );
};

export default SingleStatsLine;
