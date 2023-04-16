import { useMemo } from "react";
import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import { useGetDaysDataQuery } from "../../../state/api";
import AreaChartComponent from "./AreaChartComponent";
import LineChartCompnent from "./LineChartCompnent";
import BarChartComponent from "./BarChartComponent";

const Row1 = () => {
  const { data } = useGetDaysDataQuery("01-04-2023_01-01-2029");

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
        <AreaChartComponent />
      </DashboardBox>
      <DashboardBox gridArea="b">
        <LineChartCompnent />
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BarChartComponent />
      </DashboardBox>
    </>
  );
};

export default Row1;