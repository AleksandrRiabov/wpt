import { useEffect, useState } from "react";
import { GetOptionsDataResponse } from "../../state/types";
import { useGetOptionsDataQuery } from "../../state/api";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { PageHeader } from "../../components";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import ConfigBox from "./ConfigBox/ConfigBox";
import ConfigProductBox from "./ConfigProductBox/ConfigProductBox";

const Config = () => {
  const [updatedDataState, setUpdatedDataState] =
    useState<GetOptionsDataResponse | null>(null);

  const { data, isLoading, isError, refetch } = useGetOptionsDataQuery();

  useEffect(() => {
    if (!data) return;
    setUpdatedDataState(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container maxWidth="xl" sx={{ marginBottom: "20px" }}>
      <PageHeader title="Edit Configurations" />
      {isLoading ? (
        <FlexCenterCenter height="90vh">
          <CircularProgress />
        </FlexCenterCenter>
      ) : isError ? (
        <FlexCenterCenter height="90vh">
          <Typography variant="h4">
            "Error.. Could not get options. Please Try again later.."
          </Typography>
        </FlexCenterCenter>
      ) : (
        <DashboardBox sx={{ padding: { xs: "20px 5px", sm: "20px" } }}>
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              padding: { md: "20px 0" },
              margin: "0 auto",
            }}
          >
            {/* Freight Type */}
            <ConfigBox
              title="Freight-Type"
              name="freightType"
              configCategory={updatedDataState?.freightType || []}
            />
            {/* Contractor */}
            <ConfigBox
              title="Contractors"
              name="contractor"
              configCategory={updatedDataState?.contractor || []}
            />
            {/* Crossed */}
            <ConfigBox
              title="Crossed"
              name="crossed"
              configCategory={updatedDataState?.crossed || []}
            />
            {/* Load Type */}
            <ConfigBox
              title="Load-Type"
              name="loadType"
              configCategory={updatedDataState?.loadType || []}
            />
            {/* Products */}
            <ConfigProductBox products={updatedDataState?.products || []} />
          </Box>
        </DashboardBox>
      )}
    </Container>
  );
};

export default Config;
