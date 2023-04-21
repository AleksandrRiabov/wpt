import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import PieChartComponent from "./PieChartComponent";
import PieChartComponent2 from "./PieChartComponent";

type Props = {};

const Row2 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="d">
        
      </DashboardBox>
      <DashboardBox gridArea="f"><PieChartComponent2/></DashboardBox>
    </>
  );
};

export default Row2;
