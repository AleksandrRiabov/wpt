import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  useTheme,
} from "@mui/material";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import EditInfoSection from "./EditInfoSection";
import PageHeader from "../../components/PageHeader/PageHeader";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { tokens } from "../../theme";
import EditProducts from "./EditProducts";
import AddProduct from "../AddTrailer/AddProduct";
import EditExtraCost from "./EditExtraCost";
import TrailerTitle from "../../components/TrailerTitle/TrailerTitle";
import useEditTrailerLogic from "./useEditTrailerLogic";
import Notifications from "../../components/Notifications/Notifications";
import useHandlePost from "./useHandlePost";
import ErrorMessage from "./ErrorMessage";
import TrailerUnavailable from "./TrailerUnavailable";
import useSendAnalytics from "../../hooks/useSendAnalytics";

const EditTrailer = () => {
  useSendAnalytics({ title: "Edit Trailer" });

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const {
    id,
    isLoadingOptions,
    editTrailerData,
    options,
    isErrorOptions,
    isLoadingTrailerData,
    isErrorTrailerData,
    trailer,
    handleChange,
    handleDateChange,
    handleCheckbox,
    handleExtraCostChange,
    addProduct,
    handleRemoveProduct,
    handleProductChange,
  } = useEditTrailerLogic();

  const {
    handlePostTrailerDetails,
    handleCloseSnackbar,
    successMessage,
    errorMessage,
    updating,
  } = useHandlePost({ id, editTrailerData });

  return (
    <Container maxWidth="xl">
      <PageHeader title="Edit Trailer" />
      {isLoadingOptions || !editTrailerData || !options ? (
        <FlexCenterCenter height="90vh">
          <CircularProgress />
        </FlexCenterCenter>
      ) : isErrorTrailerData || isErrorOptions ? (
        <ErrorMessage isErrorTrailerData={isErrorTrailerData} />
      ) : (
        <DashboardBox>
          <Box p="20px">
            {isLoadingTrailerData ? (
              <FlexCenterCenter height="90vh">
                <CircularProgress />
              </FlexCenterCenter>
            ) : isErrorTrailerData ? (
              <ErrorMessage isErrorTrailerData={isErrorTrailerData} />
            ) : !trailer ? (
              <TrailerUnavailable />
            ) : (
              <>
                <TrailerTitle
                  title={`${editTrailerData?.trailerNumber} -  ${editTrailerData?.loadType}`}
                  className={
                    editTrailerData?.cert
                      ? "certified-row"
                      : editTrailerData?.alcohol
                      ? "alcohol-row"
                      : editTrailerData?.freightType === "Sea"
                      ? "seafreight-row"
                      : ""
                  }
                />
                <Box
                  display={"flex"}
                  sx={{ flexDirection: { xs: "column", md: "row" } }}
                >
                  <EditInfoSection
                    trailer={editTrailerData}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    handleCheckbox={handleCheckbox}
                    handleExtraCostChange={handleExtraCostChange}
                    options={options}
                  />
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Extra Cost */}
                    <Box>
                      <EditExtraCost
                        handleExtraCostChange={handleExtraCostChange}
                        extraCost={editTrailerData?.extraCost || {}}
                      />
                    </Box>
                    {/* Products Section */}
                    <Box mt="40px" sx={{ maxWidth: "570px" }}>
                      <AddProduct
                        addProduct={addProduct}
                        options={options.products}
                      />
                      <Box mt="20px">
                        <EditProducts
                          removeProduct={handleRemoveProduct}
                          handleProductChange={handleProductChange}
                          products={editTrailerData?.products}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
          {/* Bottom Section (Comments and Submit BTN) */}
          <Container
            sx={{
              flexDirection: { xs: "column" },
              display: "flex",
            }}
          >
            {/* Comments */}
            <Box flex="1" p="20px">
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Add your comment here"
                placeholder="Enter your text"
                value={editTrailerData?.comments || ""}
                onChange={handleChange}
                name="comments"
                color="secondary"
              />
            </Box>
            {/* Submit BTN (Update Details) */}
            <Box
              flex="1"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  width: "50%",
                  maxWidth: "200px",
                  padding: "10px",
                  margin: "20px auto",
                }}
                onClick={handlePostTrailerDetails}
                disabled={updating}
              >
                {updating ? (
                  <CircularProgress
                    sx={{ color: colors.secondary[500] }}
                    size={24}
                  />
                ) : (
                  "Update Details"
                )}
              </Button>
            </Box>
          </Container>
        </DashboardBox>
      )}
      {/* Notifications  */}
      <Notifications
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </Container>
  );
};

export default EditTrailer;
