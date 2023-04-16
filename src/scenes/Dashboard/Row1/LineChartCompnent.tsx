import { useTheme } from "@mui/material";
import { useMemo, useState } from "react";
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
import FiltersModal from "../../../components/FiltersModal/FiltersModal";
import ChartFilters from "../ChartFilters";
import useGetCategories from "../../../hooks/useGetCategories";

const LineChartCompnent = () => {
  const { data } = useGetDaysDataQuery("01-04-2023_01-01-2029");
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const [checkedProducts, setCheckedProducts] = useState<string[]>(["Ambient"]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const categories = useGetCategories(data);

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
        handleOpen={handleOpen}
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
      <FiltersModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <ChartFilters
          categories={categories}
          setCheckedProducts={setCheckedProducts}
          checkedProducts={checkedProducts}
        />
      </FiltersModal>
    </>
  );
};

export default LineChartCompnent;
