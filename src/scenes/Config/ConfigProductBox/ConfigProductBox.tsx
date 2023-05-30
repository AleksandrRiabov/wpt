import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import { useUpdateOptionsMutation } from "../../../state/api";
import Notifications from "../../../components/Notifications/Notifications";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

type Props = {
  products: { name: string; category: string }[];
};

const ConfigProductBox = ({ products }: Props) => {
  const [productsState, setProductsState] = useState(products);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  // Set initial productsData state
  useEffect(() => {
    setProductsState(products);
  }, [products]);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  // extract function to send PUT request
  const [updateOptions, { isLoading, isSuccess, error }] =
    useUpdateOptionsMutation();

  // Sends updated details to backend
  const handleSave = async () => {
    try {
      const updatedOptions = await updateOptions({
        name: "products",
        options: productsState,
      });
      if ("error" in updatedOptions) return;

      setSuccessMessage("Product list has been updated!");
      setIsEdited(false);
    } catch (error) {
      // Handle network error
      setErrorMessage(
        "Error: Could not update products. Please make sure you are connected to the internet."
      );
      console.error(error);
    }
  };

  const handelAddProduct = ({
    product,
    category,
  }: {
    product: string;
    category: string;
  }) => {
    const productAlreadyExist = productsState.find(
      (existingProduct) =>
        existingProduct.name.toUpperCase() === product.toUpperCase()
    );

    if (productAlreadyExist)
      return setErrorMessage(
        `Product with the name "${product}" already exist!`
      );

    setProductsState([...productsState, { name: product, category }]);

    setSuccessMessage(`${product} added to the product list.`);
    setIsEdited(true);
  };

  const handleRemoveProduct = (name: string) => {
    const withoutProduct = productsState.filter(
      (existingProduct) => existingProduct.name !== name
    );

    setProductsState(withoutProduct);
    setSuccessMessage(`${name} has been removed from the products list.`);
    setIsEdited(true);
  };

  const handleCloseSnackbar = (name: "success" | "error") => {
    if (name === "error") {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }
  };

  // useEffects for updating notification messages
  useEffect(() => {
    if (error) {
      if ("status" in error) {
        setErrorMessage(`Error.. could not updated products`);
      }
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(`Product list has been updated!`);
    }
  }, [isSuccess]);

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "770px",
        minWidth: "320px",
        borderRadius: "5px",
        overflow: "hidden",
        background: colors.primary[400],
      }}
    >
      <CardHeader
        title={<Typography variant="h3">Products</Typography>}
        p="20px"
        sx={{ background: colors.secondary[600] }}
      />
      <CardContent sx={{ padding: 0 }}>
        <ProductList
          productsState={[...productsState].reverse()}
          handleRemoveProduct={handleRemoveProduct}
        />
      </CardContent>
      <ProductForm handleAddProduct={handelAddProduct} />
      <Box p="15px 0" display="flex" justifyContent="center">
        <Button
          onClick={handleSave}
          variant="contained"
          color="secondary"
          disabled={isLoading || !isEdited}
        >
          {isLoading ? "PLEASE WAIT" : "SAVE CHANGES"}
        </Button>
      </Box>
      {/* Notifications */}
      <Notifications
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </Card>
  );
};

export default ConfigProductBox;
