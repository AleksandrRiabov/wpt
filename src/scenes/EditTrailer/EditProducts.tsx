import { Box, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";

import { GetTrailersDataResponse } from "../../state/types";

type Props = {
  products: GetTrailersDataResponse["products"] | undefined;
  handleProductChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => void;
  removeProduct: (name: string) => void;
};

const EditProducts = ({
  products,
  handleProductChange,
  removeProduct,
}: Props) => {
  const theme = useTheme();
  return (
    <Box>
      {products?.map(({ name, cases, pallets }) => (
        <Box
          key={name}
          display="flex"
          p="5px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flex="1" textAlign="center">
            <Typography variant="h4">{name.toUpperCase()}</Typography>
          </Box>
          <Box flex="1">
            <TextField
              name="pallets"
              label="Pallets"
              value={pallets}
              onChange={(e) => handleProductChange(e, name)}
              color="secondary"
            />
          </Box>
          <Box flex="1">
            <TextField
              name="cases"
              label="Cases"
              value={cases}
              onChange={(e) => handleProductChange(e, name)}
              color="secondary"
            />
          </Box>
          <Box flex="0.3" display="flex" justifyContent="center">
            <Tooltip title="Remove product">
              <RemoveCircleOutline
                onClick={() => removeProduct(name)}
                sx={{ cursor: "pointer", color: theme.palette.error.main }}
              />
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default EditProducts;
