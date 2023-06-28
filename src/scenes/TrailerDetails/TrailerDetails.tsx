import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetTrailersDataQuery } from "../../state/api";
import { tokens } from "../../theme";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import PageHeader from "../../components/PageHeader/PageHeader";
import InfoSection from "./InfoSection";
import ProductsPieChart from "./ProductsPieChart";
import DeleteModalPopUp from "./DeleteModalPopUp";

const TrailerDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetTrailersDataQuery(
    `_id=${id}`
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
          ) : isError ? (
            <FlexCenterCenter>
              <Typography variant="h3">
                Error.. Please try again later.
              </Typography>
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
              {/* Bottom section */}
              <Box
                flex="1"
                mb="40px"
                sx={{
                  display: "flex",
                  justifyContent: { md: "space-between", xs: "center" },
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Container>
                  <Typography variant="h4">Comments:</Typography>
                  <Typography variant="body1" color={colors.secondary[300]}>
                    {trailer.comments}
                  </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    pt: { xs: "20px" },
                    mt: "10px",
                    flexDirection: { xs: "column", md: "row" },
                    borderTop: { xs: "1px dashed  #6c8991", sm: "none" },
                  }}
                >
                  <Link to={`/trailer/${id}/edit`}>
                    <Button
                      sx={{
                        width: "80%",
                        maxWidth: "300px",
                        margin: "0 auto",
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setOpenDeleteModal(true)}
                    variant="contained"
                    sx={{ color: "red" }}
                  >
                    Delete
                  </Button>
                  <DeleteModalPopUp
                    trailerId={id!}
                    trailerNumber={trailer.trailerNumber}
                    open={openDeleteModal}
                    handleClose={() => setOpenDeleteModal(false)}
                  />
                  <Box display="flex">
                    <Box p="15px">
                      <Typography>Created By:</Typography>
                      <Typography variant="overline">
                        {trailer?.createdBy?.name || trailer?.createdBy?.email}
                      </Typography>
                    </Box>
                    <Box p="15px">
                      <Typography>Last Edited By:</Typography>
                      <Typography variant="overline">
                        {trailer?.editedBy?.name || trailer?.editedBy?.email}
                      </Typography>
                    </Box>
                  </Box>
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
