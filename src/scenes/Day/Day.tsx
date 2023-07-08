import { Box, Container } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useCallback, useState } from "react";
import EditableProductsList from "./EditableProductList/EditableProductsList";
import { DataRow } from "./types";

const initialData = [
  {
    id: 1,
    name: "Product 1",
    pallets: 10,
    cases: 100,
    trailers: "Trailer 1",
    expectedPallets: 12,
    expectedCases: 120,
    expectedTrailers: "Trailer 2",
    coefficient: 33,
  },
  {
    id: 2,
    name: "Product 2",
    pallets: 5,
    cases: 50,
    trailers: "Trailer 3",
    expectedPallets: 8,
    expectedCases: 80,
    expectedTrailers: "Trailer 4",
    coefficient: 33,
  },
  {
    id: 3,
    name: "Svan Valley valey",
    pallets: 10,
    cases: 100,
    trailers: "Trailer 1",
    expectedPallets: 12,
    expectedCases: 120,
    expectedTrailers: "Trailer 2",
    coefficient: 33,
  },
  {
    id: 4,
    name: "Chill",
    pallets: 5,
    cases: 50,
    trailers: "Trailer 3",
    expectedPallets: 8,
    expectedCases: 80,
    expectedTrailers: "Trailer 4",
    coefficient: 33,
  },
  // Add more rows as needed
];

const Day = () => {
  const [tableData, setTableData] = useState<DataRow[]>(initialData);

  const updateProduct = useCallback(
    ({
      name,
      pallets,
      cases,
    }: {
      name: string;
      pallets: number;
      cases: number;
    }) => {
      const updateData = (tableData: DataRow[]): DataRow[] => {
        const currentProduct = tableData.find(
          (product) => product.name === name
        );

        if (!currentProduct) {
          // Handle error when current product is not found
          console.error(`Product with name ${name} not found.`);
          return tableData; // Return the original data unchanged
        }

        const updatedProduct = {
          ...currentProduct,
          cases,
          pallets,
        };

        const updatedData = tableData.map((product) =>
          product.name === name ? updatedProduct : product
        );
        return updatedData;
      };

      setTableData((prevState) => updateData(prevState));
    },
    []
  );

  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title={`Day `} />
      <Box maxWidth="xs">
        <Box
          sx={{
            overflowX: "auto",
          }}
        >
          <EditableProductsList updateProduct={updateProduct} />
        </Box>
      </Box>
    </Container>
  );
};

export default Day;
