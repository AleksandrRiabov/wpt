import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetOptionsDataQuery,
  useGetTrailersDataQuery,
  useUpdateTrailerMutation,
} from "../../state/api";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import EditInfoSection from "./EditInfoSection";
import { GetTrailersDataResponse } from "../../state/types";
import { PageHeader } from "../../components";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { tokens } from "../../theme";
import EditProducts from "./EditProducts";
import AddProduct from "../AddTrailer/AddProduct";
import EditExtraCost from "./EditExtraCost";
import TrailerTitle from "../../components/TrailerTitle/TrailerTitle";

const EditTrailer = () => {
  const { id } = useParams();
  // Fetch trailer data based on the 'id'
  const data = useGetTrailersDataQuery(`_id=${id}`);
  // Extract the first trailer object from the fetched data
  const trailer = data && data.data && data.data[0];

  // Define the state variable 'editTrailerData' and initialize it with the fetched trailer object
  const [editTrailerData, setEditTrailerData] = useState<
    GetTrailersDataResponse | undefined
  >(trailer);

  useEffect(() => {
    setEditTrailerData(trailer);
  }, [trailer]);

  const [updateTrailer, { isLoading, isError, isSuccess }] =
    useUpdateTrailerMutation();

  // Fetch options data
  const {
    data: options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetOptionsDataQuery();

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  // Handle the submission of trailer details
  const handlePostTrailerDetails = async () => {
    if (!id || !editTrailerData) return;
    await updateTrailer({ id, details: editTrailerData });
    console.log("updated");
  };

  // Handle changes in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [e.target.name]: e.target.value });
  };

  // Handle changes in the extra cost fields
  const handleExtraCostChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({
      ...editTrailerData,
      extraCost: {
        ...editTrailerData.extraCost,
        [e.target.name]: {
          ...editTrailerData.extraCost[e.target.name],
          cost: parseInt(e.target.value),
        },
      },
    });
  };

  const handleCheckbox = (name: "alcohol" | "cert") => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [name]: !editTrailerData[name] });
  };

  const handleDateChange = (
    key: "sentDate" | "deliveryDate" | "clearance" | "received",
    date: Date | null
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [key]: date });
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    editingProduct: string
  ) => {
    if (!editTrailerData) return;
    const { name, value } = e.target;

    const cleanValue = !value.length ? " " : parseInt(value.trim());
    if (!cleanValue) return;

    const foundProduct = editTrailerData.products.find(
      (product) => product.name === editingProduct
    );
    if (!foundProduct) return;
    const updatedProduct = { ...foundProduct, [name]: cleanValue };
    const filteredProducts = editTrailerData.products.filter(
      (product) => product.name !== editingProduct
    );
    const newProducts = [...filteredProducts, updatedProduct];
    setEditTrailerData({
      ...editTrailerData,
      products: newProducts,
    });
  };

  const addProduct = (product: {
    name: string;
    pallets: number;
    cases: number;
    category: string;
  }) => {
    if (!editTrailerData) return;

    const productExist = editTrailerData?.products.find(
      (existingProd) => product.name === existingProd.name
    );
    if (productExist) {
      alert(
        `${product.name} already exist, please change the value of existing product`
      );
      return;
    }

    setEditTrailerData({
      ...editTrailerData,
      products: [...editTrailerData.products, product],
    });
  };

  const handleRemoveProduct = (name: string) => {
    if (!editTrailerData) return;
    const filteredProducts = editTrailerData.products.filter(
      (product) => product.name !== name
    );

    setEditTrailerData({
      ...editTrailerData,
      products: filteredProducts,
    });
  };

  return (
    <Container maxWidth="xl">
      <PageHeader title="Edit Trailer" />
      {isLoadingOptions || !editTrailerData || !options ? (
        <FlexCenterCenter height="90vh">
          <CircularProgress />
        </FlexCenterCenter>
      ) : isError || isErrorOptions ? (
        <FlexCenterCenter height="90vh">
          <Typography variant="h4">
            {isError
              ? "Error.. Could not get trailer details. Please Try again later.."
              : "Error.. Could not get options. Please Try again later.."}
          </Typography>
        </FlexCenterCenter>
      ) : (
        <DashboardBox>
          <Box p="20px">
            {data.isLoading ? (
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
                disabled={isLoading}
              >
                {isLoading ? (
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
      {isError && (
        <Snackbar open={isError} autoHideDuration={6000} onClose={() => {}}>
          <Alert severity="error"> {"Error updating the trailer!"}</Alert>
        </Snackbar>
      )}
      {isSuccess && (
        <Snackbar open={isSuccess} autoHideDuration={6000} onClose={() => {}}>
          <Alert severity="success">Trailer Updated Successfully!</Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default EditTrailer;
