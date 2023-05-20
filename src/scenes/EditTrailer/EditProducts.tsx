import { Box, TextField, Typography } from "@mui/material";
import { GetTrailersDataResponse } from "../../state/types";

type Props = {
  products: GetTrailersDataResponse["products"] | undefined;
  handleProductChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => void;
};

const EditProducts = ({ products, handleProductChange }: Props) => {
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
            />
          </Box>
          <Box flex="1">
            <TextField
              name="cases"
              label="Cases"
              value={cases}
              onChange={(e) => handleProductChange(e, name)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default EditProducts;
