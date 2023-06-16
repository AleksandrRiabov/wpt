import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { PageHeader } from "../../components";
import { useGetTrailersDataQuery } from "../../state/api";
import { Link, useParams } from "react-router-dom";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import ProductsPieChart from "./ProductsPieChart";
import InfoSection from "./InfoSection";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import FlexBetween from "../../components/FlexBetween/FlexBetween";
import { useEffect } from "react";

const TrailerDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetTrailersDataQuery(`_id=${id}`);
  const trailer = data && data[0];

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
        <PageHeader title={` Trailer Details`} />
        <Box>
          {isLoading ? (
            <FlexCenterCenter>
              <Typography variant="h3">Loading...</Typography>
            </FlexCenterCenter>
          ) : !trailer ? (
            <FlexCenterCenter>
              <Typography variant="h4">
                We're sorry, but the trailer you're trying to access is not
                available. It may have been removed or may have never existed.
                Please check the ID and try again, or contact our support team
                if you need further assistance.
              </Typography>
            </FlexCenterCenter>
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
              <FlexBetween flex="1" mb="40px">
                <Container>
                  <Typography variant="h4">Comments:</Typography>
                  <Typography variant="body1" color={colors.secondary[300]}>
                    {trailer.comments}
                  </Typography>
                </Container>
                <Container sx={{ display: "flex" }}>
                  <Link to={`/trailer/${id}/edit`}>
                    <Button
                      sx={{
                        width: "80%",
                        maxWidth: "300px",
                        padding: "10px",
                        margin: "0 auto",
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Edit
                    </Button>
                  </Link>
                </Container>
              </FlexBetween>
            </DashboardBox>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TrailerDetails;
