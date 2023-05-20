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

type Props = {};

const EditTrailer = (props: Props) => {
  const { id } = useParams();
  const data = useGetTrailersDataQuery(`_id=${id}`);
  const trailer = data && data.data && data.data[0];

  const [editTrailerData, setEditTrailerData] = useState<
    GetTrailersDataResponse | undefined
  >(trailer);

  const [updateTrailer, { isLoading, isError, isSuccess }] =
    useUpdateTrailerMutation();
  const {
    data: options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetOptionsDataQuery();

  useEffect(() => {
    setEditTrailerData(trailer);
  }, [trailer]);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handlePostTrailerDetails = async () => {
    if (!id || !editTrailerData) return;
    await updateTrailer({ id, details: editTrailerData });
    console.log("updated");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [e.target.name]: e.target.value });
  };

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

    const foundProduct = editTrailerData.products.find(
      (product) => product.name === editingProduct
    );
    if (!foundProduct) return;
    const updatedProduct = { ...foundProduct, [name]: value };
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

  if (isError || isErrorOptions) {
    return (
      <FlexCenterCenter height="90vh">
        <Typography variant="h4">
          {isError
            ? "Error.. Could not get trailer details. Please Try again later.."
            : "Error.. Could not get options. Please Try again later.."}
        </Typography>
      </FlexCenterCenter>
    );
  }

  // Wait for both API calls to complete before rendering
  if (isLoading || isLoadingOptions || !editTrailerData || !options) {
    return (
      <FlexCenterCenter height="90vh">
        <CircularProgress />
      </FlexCenterCenter>
    );
  }

  console.log("render Edit trailer");
  return (
    <Container maxWidth="xl">
      <PageHeader title="Edit Trailer" />
      <DashboardBox>
        <Box>
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
            <Box display={"flex"} flexDirection="column" alignItems="center">
              <EditInfoSection
                trailer={editTrailerData}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleCheckbox={handleCheckbox}
                handleExtraCostChange={handleExtraCostChange}
                options={options}
              />
              <Box>
                <AddProduct
                  addProduct={addProduct}
                  options={options.products}
                />
                <EditProducts
                  handleProductChange={handleProductChange}
                  products={editTrailerData?.products}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "50%",
            maxWidth: "200px",
            padding: "10px",
            margin: "0 auto",
          }}
          onClick={handlePostTrailerDetails}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress sx={{ color: colors.secondary[500] }} size={24} />
          ) : (
            "Update Details"
          )}
        </Button>
      </DashboardBox>
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
