import { Box, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { PageHeader } from "../../components";
import { useGetTrailersDataQuery } from "../../state/api";
import { useParams } from "react-router-dom";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import ProductsPieChart from "./ProductsPieChart";
import InfoSection from "./InfoSection";

const TrailerDetails = () => {
  const { id } = useParams();
  const data = useGetTrailersDataQuery(`_id=${id}`);
  const trailer = data && data.data && data.data[0];

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader title={` Trailer Details`} />
        <Box>
          {data.isLoading ? (
            <Typography variant="h2">Loading</Typography>
          ) : !trailer ? (
            <Box> No Trailers found</Box>
          ) : (
            <DashboardBox display={"flex"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                }}
              >
                {/* Trailer Info section */}
                <InfoSection trailer={trailer} />
                {/* Chart section */}
                <Box display={"flex"} flex={1}>
                  <Box height="400px" width="100%">
                    {trailer?.products && (
                      <ProductsPieChart data={trailer?.products} />
                    )}
                  </Box>
                </Box>
              </Box>

              <Box
                display="flex"
                sx={{
                  alignSelf: { lg: "flex-end" },
                  width: { lg: "50%" },
                  textAlign: "center",
                }}
              >
                {/* Products section */}
                <Box flex="1" sx={{}} p="20px">
                  {trailer?.products.map((product) => (
                    <Typography
                      variant="subtitle1"
                      key={product.name}
                    >{`- ${product.name}: ${product.pallets} pallets - ${product.cases} cases`}</Typography>
                  ))}
                </Box>
              </Box>
              {/* comments section */}
              <Box flex="1" mb="40px">
                <Container>
                  <Typography variant="h4">Comments:</Typography>
                  <Typography variant="body1" color={colors.secondary[300]}>
                    {trailer.comments}
                  </Typography>
                </Container>
              </Box>
            </DashboardBox>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TrailerDetails;
