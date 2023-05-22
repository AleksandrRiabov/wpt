import { useEffect, useState } from "react";
import { GetOptionsDataResponse } from "../../state/types";
import { useGetOptionsDataQuery } from "../../state/api";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { PageHeader } from "../../components";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import ConfigBox from "./ConfigBox";
import ConfigProductBox from "./ConfigProductBox";

export type ConfigCategory =
  | "freightType"
  | "loadType"
  | "contractor"
  | "crossed"
  | "products";

const Config = () => {
  const [updatedDataState, setUpdatedDataState] =
    useState<GetOptionsDataResponse | null>(null);

  const { data, isLoading, isError } = useGetOptionsDataQuery();

  useEffect(() => {
    if (!data) return;
    setUpdatedDataState(data);
  }, [data]);

  const handleRemoveOption = (key: ConfigCategory, currentOption: string) => {
    if (!updatedDataState || key === "products") return;

    const filteredOptions = updatedDataState[key].filter(
      (option: string) => option !== currentOption
    );

    setUpdatedDataState({ ...updatedDataState, [key]: filteredOptions });
  };

  const addOption = (configCategoryName: ConfigCategory, value: string) => {
    if (!updatedDataState || value === "products") return;
    setUpdatedDataState({
      ...updatedDataState,
      [configCategoryName]: [...updatedDataState[configCategoryName], value],
    });
  };

  if (isError)
    return (
      <FlexCenterCenter height="90vh">
        <Typography variant="h4">
          "Error.. Could not get options. Please Try again later.."
        </Typography>
      </FlexCenterCenter>
    );

  if (isLoading)
    return (
      <FlexCenterCenter height="90vh">
        <CircularProgress />
      </FlexCenterCenter>
    );

  console.log("render");

  return (
    <Container maxWidth="xl" sx={{ marginBottom: "20px" }}>
      <PageHeader title="Edit Configurations" />
      <DashboardBox sx={{ padding: { xs: "20px 5px", sm: "20px" } }}>
        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Load Type */}
          <ConfigBox
            title="Load-Type"
            name="loadType"
            configCategory={updatedDataState?.loadType || []}
            handleRemoveOption={handleRemoveOption}
            addOption={addOption}
          />
          {/* Freight Type */}
          <ConfigBox
            title="Freight-Type"
            name="freightType"
            configCategory={updatedDataState?.freightType || []}
            handleRemoveOption={handleRemoveOption}
            addOption={addOption}
          />
          {/* Contractor */}
          <ConfigBox
            title="Contractors"
            name="contractor"
            configCategory={updatedDataState?.contractor || []}
            handleRemoveOption={handleRemoveOption}
            addOption={addOption}
          />
          {/* Crossed */}
          <ConfigBox
            title="Crossed"
            name="crossed"
            configCategory={updatedDataState?.crossed || []}
            handleRemoveOption={handleRemoveOption}
            addOption={addOption}
          />
          {/* Products */}
          <ConfigProductBox products={updatedDataState?.products || []} />
        </Box>
      </DashboardBox>
    </Container>
  );
};

export default Config;
