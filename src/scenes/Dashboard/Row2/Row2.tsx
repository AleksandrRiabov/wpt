import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import PieChartComponent from "./PieChartComponent";

type Props = {};

const Row2 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="d">
        
      </DashboardBox>
      <DashboardBox gridArea="f"><PieChartComponent/></DashboardBox>
    </>
  );
};

export default Row2;
