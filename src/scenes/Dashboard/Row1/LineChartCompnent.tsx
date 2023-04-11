import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { tokens } from "../../../theme";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";

const LineChartCompnent = () => {
  const { data } = useGetDaysDataQuery("01-04-2023_01-01-2029");
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const chartData = useMemo(() => {
    return (
      data &&
      data.map((day) => {
        const product = day.products.find(
          (product) => product.name === "Chill"
        );
        return {
          name: day.date.slice(0, 10),
          cases: Number(product?.cases),
          pallets: Number(product?.pallets),
        };
      })
    );
  }, [data]);
  return (
    <>
      <BoxHeader
        title="Product: Chill"
        subtitle="7 Days Statistics"
        sideText="+5%"
      />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: -20,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} stroke={colors.white[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.primary[500] }}
            itemStyle={{ color: colors.primary[100] }}
          />
          <Legend
            height={20}
            wrapperStyle={{
              margin: "0 0 10px 0",
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cases"
            stroke={colors.green[100]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pallets"
            stroke={colors.green[400]}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartCompnent;
