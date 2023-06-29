import { Box, Typography } from "@mui/material";
import { GetTrailersDataResponse } from "../../state/types";

type Props = {
  trailer: GetTrailersDataResponse | undefined;
};

const ProductsInfoSection = ({ trailer }: Props) => {
  const countTotals = (trailer: GetTrailersDataResponse | undefined) => {
    if (!trailer || !trailer.products) {
      return { pallets: 0, cases: 0 };
    }
    return trailer.products.reduce(
      (acc, current) => {
        acc.cases += current.cases;
        acc.pallets += current.pallets;
        return acc;
      },
      { pallets: 0, cases: 0 }
    );
  };

  const total = countTotals(trailer);

  return (
    <Box
      display="flex"
      sx={{
        alignSelf: { lg: "flex-end" },
        width: { lg: "50%" },
        textAlign: "center",
      }}
    >
      <Box flex="1" p="20px">
        <Typography variant="h3" mb="10px">
          Total:{" "}
          <Typography variant="h3" component="span" color="secondary">
            <strong>{total.pallets} </strong> pallets
          </Typography>{" "}
          and{" "}
          <Typography variant="h3" component="span" color="secondary">
            <strong>{total.cases}</strong> cases
          </Typography>
        </Typography>
        {trailer?.products.map((product) => (
          <Typography
            variant="subtitle1"
            key={product.name}
          >{` ${product.name}: ${product.pallets} pallets - ${product.cases} cases`}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ProductsInfoSection;
