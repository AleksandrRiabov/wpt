import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

type Props = {
  addProduct: (product: {
    name: string;
    cases: number;
    pallets: number;
    category: string;
  }) => void;
};

type Product = {
  name: string;
  cases: number;
  pallets: number;
  category: string;
};
const products = ["Chill", "Ambient", "Bread", "SV924", "Frozen"];

const AddProduct = ({ addProduct }: Props) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);

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
      console.log("Not all required fields filled up");
      return;
    } else {
      if (!product.pallets) {
        const newProduct = { ...product, pallets: 0 };
        addProduct(newProduct);
      } else {
        addProduct(product);
      }
      setProduct(undefined);
    }
    console.log(product);
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
          >
            {products.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
