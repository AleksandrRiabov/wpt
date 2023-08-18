import DashboardBox from "../../../components/dashboardBox/DashboardBox";
import TotalCases from "./TotalCases/TotalCases";
import TrailersBoard from "./TrailersBoard/TrailersBoard";

type Props = {};

const Row2 = (props: Props) => {
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
