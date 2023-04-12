import { Box, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { tokens } from "../../../theme";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetDaysDataQuery } from "../../../state/api";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";
import ChartFilters from "../ChartFilters";
const defaultCategory = ["Fresh"];

const categories = {
  Fresh: ['Chill', 'Bread', 'Produce', "Directs", 'Flowers', 'Electronics' ],
  Ambient: ['711', 'Ambient']
}

const AreaChartComponent = () => {
  const [checkedProducts, setCheckedProducts] =
    useState<string[]>(defaultCategory);
  const { data } = useGetDaysDataQuery("01-04-2023_01-01-2029");
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const chartData = useMemo(() => {
    if (!data) return [];

    const selectedSet = new Set(checkedProducts);
    const result = [];

    for (const day of data) {
      let totalCases = 0;
      let totalPallets = 0;

      for (const product of day.products) {
        if (
          selectedSet.has(product.category) ||
          selectedSet.has(product.name)
        ) {
          totalCases += Number(product.cases);
          totalPallets += Number(product.pallets);
        }
      }

      if (totalCases > 0 && totalPallets > 0) {
        result.push({
          cases: totalCases,
          pallets: totalPallets,
          name: day.date.slice(0, 10),
        });
      }
    }

    return result;
  }, [data, checkedProducts]);
  return (
    <>
      <BoxHeader
        title={`Product: ${checkedProducts.join(", ")}`}
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
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
        />
      </Box>
    </>
  );
};

export default AreaChartComponent;
