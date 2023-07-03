import { Box } from "@mui/material";
import { DataRow } from "../types";
import EditableRow from "./EditableRow";
import { memo } from "react";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableFooter from "./ProductsTableFooter";

type Props = {
  tableData: DataRow[];
  updateProduct: ({
    name,
    pallets,
    cases,
  }: {
    name: string;
    pallets: number;
    cases: number;
  }) => void;
};

const EditableProductsList = ({ tableData, updateProduct }: Props) => {
  return (
    <>
      <ProductsTableHeader />
      {tableData.map((row) => (
        <Box key={row.id}>
          <EditableRow updateProduct={updateProduct} row={row} />
        </Box>
      ))}
      <ProductsTableFooter />
    </>
  );
};

export default memo(EditableProductsList);
