import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { useGetKpisQuery } from "../../state/api";

type Props = {};

const Row1 = (props: Props) => {
  const { data } = useGetKpisQuery();

  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default Row1;
