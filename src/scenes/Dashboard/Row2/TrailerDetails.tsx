import { Box, Container, Typography } from "@mui/material";
import { PageHeader } from "../../../components";
import { useGetTrailersDataQuery } from "../../../state/api";
import { useParams } from "react-router-dom";
import DashboardBox from "../../../components/dashboardBox/DashboardBox";

const TrailerDetails = () => {
  const { id } = useParams();
  const data = useGetTrailersDataQuery(`id=${id}`);
  const trailer = data && data.data && data.data[0];
  console.log(data.isLoading);

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader title={`${trailer?.trailerNumber} Trailer Details`} />
        <Box>
          {data.isLoading ? (
            <Typography variant="h2">Loading</Typography>
          ) : (
            <DashboardBox>
              <Box p="10px">
                <Box>
                  <BoxTitle title="TRAILER INFO" />
                  <Typography>
                    {" "}
                    Trailer Number:{" "}
                    <Box component="span" sx={{ float: "right" }}>
                      {trailer?.trailerNumber}
                    </Box>
                  </Typography>
                  <Typography> Reference: {trailer?.reference}</Typography>
                  <Typography> Load Type: {trailer?.loadType}</Typography>
                  <Typography> Freight Type: {trailer?.freightType}</Typography>
                  <Typography>
                    {" "}
                    Certified: {trailer?.cert ? "Yes" : "No"}
                  </Typography>
                  <Typography>
                    {" "}
                    Has Alcohol: {trailer?.alcohol ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Box>
            </DashboardBox>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TrailerDetails;

const BoxTitle = ({ title }: { title: string }) => {
  return (
    <Box>
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};
