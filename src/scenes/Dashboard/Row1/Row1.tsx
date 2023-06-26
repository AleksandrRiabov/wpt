import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import AreaChartComponent from "./AreaChartComponent";
import LineChartCompnent from "./LineChartCompnent";
import BarChartComponent from "./BarChartComponent";

const Row1 = () => {
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
