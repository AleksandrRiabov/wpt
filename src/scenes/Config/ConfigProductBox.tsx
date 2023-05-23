import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { GridDeleteIcon } from "@mui/x-data-grid";
import CustomTextField from "../../components/CustomInputs/CustomTextField";
import { Add } from "@mui/icons-material";
import { useState } from "react";

type Props = {
  products: { name: string; category: string }[];
};

const ConfigProductBox = ({ products }: Props) => {
  const [inputValue, setInputValue] = useState({ product: "", category: "" });
  const [error, setError] = useState({ error: false, message: "" });

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  console.log(products);
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
        title={<Typography variant="h3">{"title"}</Typography>}
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
              background: "pink",
            }}
          >
            <ListItemText primary={"PRODUCT NAME:"} />
            <ListItemText primary={"PRODUCT CATEGORY:"} />
          </ListItem>
          <Box sx={{ overflowY: "scroll", maxHeight: "315px" }}>
            {products.map(({ name, category }) => (
              <ListItem
                sx={{
                  borderBottom: "1px dashed rgba(255, 255, 255, 0.1)",
                }}
                key={name}
                secondaryAction={
                  <IconButton
                    // onClick={() => handleRemoveProduct(name)}
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
        <Box>
          <Box p="0 20px">
            <CustomTextField
              value={inputValue.product}
              label="Add product"
              title="Neqw Product"
              handleChange={handleChange}
              name={"product"}
            />
          </Box>
          <Box p="0 20px">
            <CustomTextField
              value={inputValue.category}
              label="Add Category"
              title="Category"
              handleChange={handleChange}
              name={"category"}
            />
          </Box>
        </Box>
        <Box p="15px 0" display="flex" justifyContent="center">
          <Button variant="contained" color="secondary">
            Add <Add />
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ConfigProductBox;
