import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

type Props = {
  products: {
    name: string;
    cases: number;
    pallets: number;
    category: string;
  }[];
  removeProduct: (name: string) => void;
};

export default function ProductsTable({ products, removeProduct }: Props) {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Pallets</TableCell>
            <TableCell>Cases</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.pallets}</TableCell>
              <TableCell>{row.cases}</TableCell>
              <TableCell align="right">
                <Delete
                  onClick={() => removeProduct(row.name)}
                  sx={{ cursor: "pointer", color: colors.secondary[500] }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
