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
  options: GetOptionsDataResponse['products'];
};

type Product = {
  name: string;
  cases: number;
  pallets: number;
  category: string;
};


const AddProduct = ({ addProduct, options }: Props) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState(false);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if ((name === "pallets" || name === "cases") && isNaN(Number(value)))
      return;
    setProduct({ ...product!, [name]: value });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!product?.name || !product.cases) {
      setError(true);
      return;
    }

    const newProduct = !product.pallets ? { ...product, pallets: 0 } : product;
    addProduct(newProduct);
    setProduct({ name: "", cases: 0, pallets: 0, category: "" });
    setError(false);
  };

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <Grid container spacing={3}>
        {/* Product Name */}
        <Grid item xs={12} sm={4}>
          <TextField
            name="name"
            label="Product Name"
            value={product?.name || ""}
            fullWidth
            select
            onChange={handleChange}
            error={error && !product?.name}
            helperText={error && !product?.name && "Select Product"}
          >
            {options.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* Pallets*/}
        <Grid item xs={6} sm={3}>
          <TextField
            autoComplete="off"
            name="pallets"
            label="Pallets"
            value={product?.pallets || ""}
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        {/* Cases */}
        <Grid item xs={6} sm={3}>
          <TextField
            autoComplete="off"
            name="cases"
            label="Cases"
            value={product?.cases || ""}
            fullWidth
            onChange={handleChange}
            error={error && !product?.cases}
            helperText={error && !product?.cases && "Insert Cases Qantity"}
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
