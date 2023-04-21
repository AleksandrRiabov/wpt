import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import PieChartComponent from "./PieChartComponent";
import TrailersBoard from "./TrailersBoard/TrailersBoard";

type Props = {};

const Row2 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="d">
        <TrailersBoard />
      </DashboardBox>
      <DashboardBox gridArea="f"><PieChartComponent/></DashboardBox>
    </>
  );
};

export default Row2;
