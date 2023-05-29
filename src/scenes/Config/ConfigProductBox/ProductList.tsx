import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

type Props = {
  productsState: { name: string; category: string }[];
  handleRemoveProduct: (name: string) => void;
};

const ProductList = ({ productsState, handleRemoveProduct }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <List
      sx={{
        background: colors.primary[400],
      }}
    >
      <ListItem
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
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
              "&:hover": {
                background: colors.primary[300],
              },
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
  );
};

export default ProductList;
