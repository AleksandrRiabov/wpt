import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import SingleCell from "./SingleCell";
import { tokens } from "../../../theme";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { getFormattedDateWithAdjacentDays } from "./helpers";

const ProductsTableHeader = () => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);
  const { date } = useParams();

  const { current, previous, next } = getFormattedDateWithAdjacentDays(date);

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid",
        flexDirection: "column",
      }}
    >
      <Box
        padding="20px"
        textAlign="center"
        display="flex"
        justifyContent="center"
        sx={{ background: colors.primary[700] }}
      >
        <Link to={`/day/${previous}`}>
          <Tooltip title="Go to previouse day">
            <ArrowBackIosNew
              sx={{
                marginRight: "20px",
                fontSize: "1.4rem",
                color: colors.secondary[500],
              }}
            />
          </Tooltip>
        </Link>
        <Typography variant="h3">{current}</Typography>
        <Link to={`/day/${next}`}>
          <Tooltip title="Go to next day">
            <ArrowForwardIos
              sx={{
                marginLeft: "20px",
                fontSize: "1.4rem",
                color: colors.secondary[500],
              }}
            />
          </Tooltip>
        </Link>
      </Box>
      <Box display="flex">
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
    </Box>
  );
};

export default ProductsTableHeader;
