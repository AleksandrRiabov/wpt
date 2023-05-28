import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useUpdateOptionsMutation } from "../../state/api";

type Props = {
  products: { name: string; category: string }[];
};

const ConfigProductBox = ({ products }: Props) => {
  const [productsState, setProductsState] = useState(products);
  const [inputValue, setInputValue] = useState({ product: "", category: "" });
  const [validationError, setValidationError] = useState<
    "product" | "category" | null
  >(null);
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
      await updateOptions({ name: "products", options: productsState });
      setIsEdited(false);
      setSuccessMessage("Product list has been updated!");
    } catch (error) {
      // Handle network error
      setErrorMessage(
        "Error: Could not update products. Please make sure you are connected to the internet."
      );
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handelAddProduct = () => {
    const { product, category } = inputValue;
    const productAlreadyExist = productsState.find(
      (existingProduct) =>
        existingProduct.name.toUpperCase() === product.toUpperCase()
    );

    if (productAlreadyExist)
      return setErrorMessage(
        `Product with the name "${product}" already exist!`
      );
    if (!product) return setValidationError("product");
    if (!category) return setValidationError("category");

    setValidationError(null);

    setProductsState([
      ...productsState,
      { name: inputValue.product, category: inputValue.category },
    ]);
    setInputValue({ product: "", category: "" });
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
        <List
          sx={{
            background: colors.primary[400],
          }}
        >
          <ListItem
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <ListItemText primary={"PRODUCT NAME:"} />
            <ListItemText primary={"PRODUCT CATEGORY:"} />
          </ListItem>
          <Box sx={{ overflowY: "scroll", maxHeight: "315px" }}>
            {productsState.map(({ name, category }) => (
              <ListItem
                sx={{
                  borderBottom: "1px dashed rgba(255, 255, 255, 0.1)",
                }}
                key={name}
                secondaryAction={
                  <IconButton
                    onClick={() => handleRemoveProduct(name)}
                    edge="end"
                    aria-label="delete"
                  >
                    <GridDeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={name} />
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </Box>
        </List>
      </CardContent>

      <Box
        sx={{
          padding: "0 20px",
          marginTop: "auto",
          background: colors.primary[500],
        }}
      >
        <Box p="20px 0" display="flex" justifyContent="space-around">
          <Box p="5px">
            <TextField
              value={inputValue.product}
              label="Add product"
              onChange={handleChange}
              name={"product"}
              error={validationError === "product"}
              color="secondary"
            />
          </Box>
          <Box p="5px">
            <TextField
              value={inputValue.category}
              label="Add Category"
              onChange={handleChange}
              name={"category"}
              error={validationError === "category"}
              color="secondary"
            />
          </Box>
        </Box>
        <Box>
          <Box p="15px 0" display="flex" justifyContent="center">
            <Button
              onClick={handelAddProduct}
              variant="contained"
              color="secondary"
            >
              Add <Add />
            </Button>
          </Box>
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
        </Box>
      </Box>
      {/* Notifications */}
      {errorMessage && (
        <Snackbar
          open={errorMessage.length > 0}
          autoHideDuration={4000}
          onClose={() => handleCloseSnackbar("error")}
        >
          <Alert severity="error"> {errorMessage}</Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={successMessage.length > 0}
          autoHideDuration={6000}
          onClose={() => handleCloseSnackbar("success")}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}
    </Card>
  );
};

export default ConfigProductBox;
