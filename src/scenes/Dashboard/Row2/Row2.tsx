import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import PieChartComponent from "./PieChartComponent";

type Props = {};

const Row2 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="d">
        <PieChartComponent/>
      </DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default Row2;
