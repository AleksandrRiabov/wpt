import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { GetOptionsDataResponse } from "../../state/types";

type Props = {
  addProduct: (product: {
    name: string;
    cases: number;
    pallets: number;
    category: string;
  }) => void;
  options: GetOptionsDataResponse["products"];
};

type Product = {
  name: string;
  cases: number;
  pallets: number;
  category: string;
};

const AddProduct = ({ addProduct, options }: Props) => {
  // State for the new product being added
  const [product, setProduct] = useState<Product>({} as Product);
  const [error, setError] = useState(false);

  // Get theme and colors from MUI theme
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  // Handle change for Pallets and Cases inputs
  const handlePalletsCasesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Ensure input is a valid number
    if (isNaN(Number(value))) return;
    setProduct({ ...product!, [name]: value });
  };

  // Handle change when selecting a product from the dropdown
  const handleProductChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Find the selected option from the dropdown
    const selectedOption = options.find((option) => option.name === value);

    // Update product state with selected product and its category
    if (selectedOption) {
      setProduct({
        ...product,
        [name]: value,
        category: selectedOption.category,
      });
    }
  };

  // Handle click when adding the product
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!product?.name || !product.cases) {
      setError(true);
      return;
    }

    // If no pallets added, set pallets to zero
    const newProduct = !product.pallets ? { ...product, pallets: 0 } : product;
    addProduct(newProduct);

    // Reset form values and errors
    setProduct({ name: "", cases: 0, pallets: 0, category: "" });
    setError(false);
  };

  console.log(product); // Log the current product state
  return (
    <Box
      sx={
        {
          // Styling for the outer box
        }
      }
    >
      <Grid container spacing={3}>
        {/* Product Name */}
        <Grid item xs={12} sm={4}>
          <TextField
            name="name"
            label="Product Name"
            value={product.name || ""}
            fullWidth
            select
            onChange={handleProductChange}
            error={error && !product?.name}
            helperText={error && !product?.name && "Select Product"}
            required
          >
            {options.map((option) => (
              <MenuItem
                key={option.name}
                value={option.name}
                data-category={option.category}
              >
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* Pallets */}
        <Grid item xs={6} sm={3}>
          <TextField
            autoComplete="off"
            name="pallets"
            label="Pallets"
            value={product.pallets || ""}
            fullWidth
            onChange={handlePalletsCasesChange}
          />
        </Grid>
        {/* Cases */}
        <Grid item xs={6} sm={3}>
          <TextField
            autoComplete="off"
            name="cases"
            label="Cases"
            value={product.cases || ""}
            fullWidth
            onChange={handlePalletsCasesChange}
            error={error && !product?.cases}
            helperText={error && !product?.cases && "Insert Cases Quantity"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Button to add the product */}
          <Button
            sx={{ background: colors.secondary[500] }}
            variant="contained"
            onClick={handleClick}
            size="small"
          >
            <Add />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProduct;
