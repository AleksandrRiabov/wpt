import { Box, useTheme } from "@mui/material";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { tokens } from "../theme";

type Props = {
  chartData: {
    cases: number;
    pallets: number;
    name: string;
  }[];
};

const LineChart = ({ chartData }: Props) => {
  // Use the `useTheme` hook to access the MUI theme object
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Box height="100%">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 20,
            right: 25,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="10%"
                stopColor={colors.green[400]}
                stopOpacity={1}
              />
              <stop
                offset="90%"
                stopColor={colors.green[400]}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis
            tickLine={false}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.primary[500] }}
            itemStyle={{ color: colors.primary[100] }}
          />
          <Area
            type="monotone"
            dataKey="cases"
            stroke={colors.lightBlue[800]}
            fillOpacity={0.7}
            fill="url(#colorDays)"
          />
          <Area
            type="monotone"
            dataKey="pallets"
            stroke={colors.primary[700]}
            fillOpacity={0.9}
            fill="url(#colorDays)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChart;
