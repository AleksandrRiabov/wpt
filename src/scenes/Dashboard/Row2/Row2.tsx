import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import TotalCases from "./TotalCases/TotalCases";
import TrailersBoard from "./TrailersBoard/TrailersBoard";

const Row2 = () => {
  return (
    <>
      <DashboardBox gridArea="d">
        <TrailersBoard />
      </DashboardBox>
      <DashboardBox gridArea="f">
        <TotalCases />
      </DashboardBox>
    </>
  );
};

export default Row2;
