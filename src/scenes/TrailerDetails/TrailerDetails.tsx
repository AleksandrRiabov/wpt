import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetTrailersDataQuery } from "../../state/api";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import PageHeader from "../../components/PageHeader/PageHeader";
import InfoSection from "./InfoSection";
import ProductsPieChart from "./ProductsPieChart";
import BottomSection from "./BottomSection";

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
              <BottomSection
                id={id!}
                trailer={trailer}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </DashboardBox>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TrailerDetails;
