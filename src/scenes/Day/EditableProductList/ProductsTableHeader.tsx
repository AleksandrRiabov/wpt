import { Box, Typography, useTheme } from "@mui/material";
import SingleCell from "./SingleCell";
import { tokens } from "../../../theme";

const ProductsTableHeader = () => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
      }}
    >
      <Box flex="1">
        <Box
          textAlign="center"
          p="12px"
          sx={{ background: colors.secondary[500] }}
        >
          <Typography variant="h3">Actual Volumes</Typography>
        </Box>
        <Box display="flex" flex="1">
          <SingleCell flex="1" sx={{ background: colors.primary[700] }}>
            <Typography>
              <strong>Product</strong>
            </Typography>
          </SingleCell>
          {/* Actual Data */}
          <SingleCell
            flex="1"
            sx={{
              borderLeft: `1px solid ${colors.primary[400]}`,
            }}
          >
            <Typography>
              <strong>Cases</strong>
            </Typography>
          </SingleCell>
          <SingleCell flex="1">
            <Typography>
              <strong>Pallets</strong>
            </Typography>
          </SingleCell>
          <SingleCell flex="1" sx={{ background: colors.primary[300] }}>
            <Typography>
              <strong>Trailers</strong>
            </Typography>
          </SingleCell>
        </Box>
      </Box>
      {/* Expected data */}
      <Box flex="1">
        <Box
          textAlign="center"
          p="12px"
          sx={{ background: colors.secondary[900] }}
        >
          <Typography variant="h3">Expected Volumes</Typography>
        </Box>
        <Box display="flex" flex="1">
          <SingleCell flex="1">
            <Typography>
              <strong>Cases</strong>
            </Typography>
          </SingleCell>
          <SingleCell flex="1">
            <Typography>
              <strong>Pallets</strong>
            </Typography>
          </SingleCell>
          <SingleCell flex="1" sx={{ background: colors.primary[300] }}>
            <Typography>
              <strong>Trailers</strong>
            </Typography>
          </SingleCell>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsTableHeader;
