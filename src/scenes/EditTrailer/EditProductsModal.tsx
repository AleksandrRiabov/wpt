import { Box, TextField, Typography } from "@mui/material";
import { GetTrailersDataResponse } from "../../state/types";

type Props = {
  products: GetTrailersDataResponse["products"] | undefined;
  handleProductChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => void;
};

const EditProductsModal = ({ products, handleProductChange }: Props) => {
  console.log(products);
  return (
    <Box
      sx={{
        padding: "10px",
        width: { sm: "80%" },
        margin: "0 auto",
      }}
    >
      <Typography variant="h3" p="10px 0">
        Products:
      </Typography>
      {products?.map(({ name, cases, pallets }) => (
        <Box display="flex" justifyContent="space-between">
          <Box flex="1">
            <Typography variant="h4">{name}</Typography>
          </Box>
          <Box flex="1">
            <TextField
              name="pallets"
              label="Pallets"
              value={pallets}
              onChange={(e) => handleProductChange(e, name)}
              sx={{ minWidth: "200px" }}
            />
          </Box>
          <Box flex="1">
            <TextField
              name="cases"
              label="Cases"
              value={cases}
              onChange={(e) => handleProductChange(e, name)}
              sx={{ minWidth: "200px" }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default EditProductsModal;
