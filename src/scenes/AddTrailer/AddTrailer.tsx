import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { tokens } from "../../theme";

import ProductsSection from "./ProductsSection";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import PageHeader from "../../components/PageHeader/PageHeader";
import useAddTrailerLogic from "./useAddTrailerLogic";
import Notifications from "../../components/Notifications/Notifications";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import useSendAnalytics from "../../hooks/useSendAnalytics";

const AddTrailer = () => {
  useSendAnalytics({ title: "Add Trailer" });
  const {
    formState,
    isLoading,
    errorMessage,
    successMessage,
    options,
    isLoadingOptions,
    isErrorOptions,
    trailerNumberError,
    loadTypeError,
    productsError,
    referenceError,
    handlePost,
    handleChange,
    handleCheckbox,
    handleDateChange,
    addProduct,
    removeProduct,
    handleCloseSnackbar,
  } = useAddTrailerLogic();
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title="Add New Trailer" />
      {isErrorOptions ? (
        <FlexCenterCenter>
          <Typography>Error... Could not load the Options</Typography>
        </FlexCenterCenter>
      ) : (
        <DashboardBox>
          <Box p="20px">
            {isLoadingOptions ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="400px"
              >
                <Typography variant="h4">Loading Options..</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {/* TOP Section - TrailerNumber, LoadType, Contractor and Dates*/}
                <TopSection
                  formState={formState}
                  handleDateChange={handleDateChange}
                  handleChange={handleChange}
                  trailerNumberError={trailerNumberError}
                  loadTypeError={loadTypeError}
                  options={options}
                />
                {/* MIDDLE Section - Reference, FreightType, Alcohol/Cert, Cooments */}
                <MiddleSection
                  formState={formState}
                  handleChange={handleChange}
                  options={options}
                  handleCheckbox={handleCheckbox}
                  referenceError={referenceError}
                />
                {/* {PRODUCTS Section} */}
                <Grid item xs={12} md={8}>
                  <ProductsSection
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    products={formState.products}
                    options={options?.products || []}
                  />
                  {productsError.error ? (
                    <Box p="5px" color="red">
                      {productsError.message}
                    </Box>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  {/* SUBMIT */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePost}
                    disabled={isLoading}
                    sx={{ background: colors.secondary[500], width: "200px" }}
                  >
                    {isLoading ? (
                      <CircularProgress
                        sx={{ color: colors.secondary[500] }}
                        size={24}
                      />
                    ) : (
                      "Create Trailer"
                    )}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </DashboardBox>
      )}
      <Notifications
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </Container>
  );
};

export default AddTrailer;
