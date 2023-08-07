import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import CountUp from "react-countup";

type Props = {
  title: string;
  value: number;
};

const StatsLine = ({ title, value }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Typography variant="h3" padding="5px ">
      {title}:{" "}
      <Typography
        variant="h4"
        component="span"
        sx={{ fontSize: "20px", color: colors.secondary[500] }}
      >
        <CountUp
          start={0}
          end={Number(value)}
          duration={1}
          separator=","
          decimal="."
        />
      </Typography>
    </Typography>
  );
};

export default StatsLine;
