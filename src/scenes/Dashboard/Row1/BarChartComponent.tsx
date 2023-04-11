import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { tokens } from "../../../theme";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";

const BarChartComponent = () => {
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
        title="Month By Month"
        subtitle="7 Days Statistics"
        sideText="+5%"
      />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 15,
            right: 50,
            left: -5,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke={colors.white[800]} />
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.green[400]}
                stopOpacity={0.7}
              />
              <stop
                offset="90%"
                stopColor={colors.green[200]}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: colors.primary[500] }}
            itemStyle={{ color: colors.primary[100] }}
          />
          <Bar dataKey="cases" fill="url(#colorBar)" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartComponent;
