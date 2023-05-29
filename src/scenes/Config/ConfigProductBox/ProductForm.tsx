import { Add } from "@mui/icons-material";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from "react";

type Props = {
  handleAddProduct: (inputValue: { product: string; category: string }) => void;
};

const ProductForm = ({ handleAddProduct }: Props) => {
  const [inputValue, setInputValue] = useState({ product: "", category: "" });
  const [validationError, setValidationError] = useState<
    "product" | "category" | null
  >(null);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const addToProducts = () => {
    const { product, category } = inputValue;
    if (!product) return setValidationError("product");
    if (!category) return setValidationError("category");
    handleAddProduct(inputValue);
    setValidationError(null);
    setInputValue({ product: "", category: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
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
          <Button onClick={addToProducts} variant="contained" color="secondary">
            Add <Add />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
