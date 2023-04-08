import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import { tokens } from "../../theme";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { useGetKpisQuery } from "../../state/api";
import BoxHeader from "../../components/BoxHeader/BoxHeader";

type Props = {};

const Row1 = (props: Props) => {
  const { data } = useGetKpisQuery();
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

  console.log(chartData);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Product: Chill"
          subtitle="7 Days Statistics"
          sideText="+5%"
        />
        <Box height="100%">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={chartData}
              margin={{
                top: 15,
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
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="cases"
                stroke={colors.lightBlue[900]}
                fillOpacity={0.7}
                fill="url(#colorDays)"
              />
              <Area
                type="monotone"
                dataKey="pallets"
                stroke={colors.primary[900]}
                fillOpacity={0.9}
                fill="url(#colorDays)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="b"> </DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default Row1;
