import { Box, Container, Typography } from "@mui/material";
import { PageHeader } from "../../../components";
import { useGetTrailersDataQuery } from "../../../state/api";
import { useParams } from "react-router-dom";

const TrailerDetails = () => {
  const { id } = useParams();
  const data = useGetTrailersDataQuery(`reference=${id}`);
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
            <Box>{trailer?.trailerNumber}</Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TrailerDetails;
