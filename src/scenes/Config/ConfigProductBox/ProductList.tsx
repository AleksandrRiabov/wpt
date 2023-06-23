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
import { useEffect, useRef } from "react";

type Props = {
  productsState: { name: string; category: string }[];
  handleRemoveProduct: (name: string) => void;
};

const ProductList = ({ productsState, handleRemoveProduct }: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Scroll to the top with animation when productsState changes
    if (listRef.current) {
      const scrollOptions: ScrollToOptions = {
        top: 0,
        behavior: "smooth",
      };
      listRef.current.scrollTo(scrollOptions);
    }
  }, [productsState]);

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
        <ListItemText sx={{ width: "50%" }} primary={"PRODUCT NAME:"} />
        <ListItemText sx={{ width: "50%" }} primary={"PRODUCT CATEGORY:"} />
      </ListItem>
      <Box ref={listRef} sx={{ overflowY: "auto", maxHeight: "315px" }}>
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
            <ListItemText sx={{ width: "50%" }} primary={name} />
            <ListItemText sx={{ width: "50%" }} primary={category} />
          </ListItem>
        ))}
      </Box>
    </List>
  );
};

export default ProductList;
