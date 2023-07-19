import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import SingleCell from "./SingleCell";
import { DataRow } from "../types";
import { tokens } from "../../../theme";
import { useParams } from "react-router-dom";

type Props = {
  row: DataRow;
  updateProduct: ({
    name,
    pallets,
    cases,
  }: {
    name: string;
    pallets: number | string;
    cases: number | string;
  }) => void;
};

const EditableRow = ({ row, updateProduct }: Props) => {
  const [inputsValue, setInputsValue] = useState({
    pallets: row.pallets,
    cases: row.cases,
  });

  const { date } = useParams();

  useEffect(() => {
    setInputsValue({
      pallets: row.pallets,
      cases: row.cases,
    });
  }, [date, row.pallets, row.cases]);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the value is a number set state
    if (!isNaN(Number(value))) {
      const positiveValue = +value.trim() > 0 ? value : "";
      setInputsValue((prev) => ({ ...prev, [name]: positiveValue }));
    }
  };

  const handleProductChange = () => {
    updateProduct({
      name: row.name,
      pallets: inputsValue.pallets,
      cases: inputsValue.cases,
    });
  };

  const errorBackground =
    !inputsValue.cases && inputsValue.pallets ? "red" : "";
  const warningBackground =
    row.calculatedCases && row.calculatedPallets === 0 ? "orange" : "";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #dedede",
          "&:hover": { border: "1px solid #fff", color: colors.secondary[500] },
        }}
      >
        <Box display="flex" flex="1">
          <SingleCell flex="1" sx={{ background: colors.primary[700] }}>
            <Typography>{row.name}</Typography>
          </SingleCell>
          {/* Editable Cells */}
          <SingleCell
            flex="1"
            sx={{
              borderRight: `1px dashed ${colors.primary[400]}`,
              borderLeft: `1px solid ${colors.primary[400]}`,
              background: errorBackground,
            }}
          >
            <input
              name="cases"
              type="number"
              value={inputsValue.cases}
              onChange={handleChange}
              onBlur={handleProductChange}
              style={{ width: "60px" }}
            />
          </SingleCell>
          <SingleCell flex="1">
            <input
              name="pallets"
              type="number"
              value={inputsValue.pallets}
              onChange={handleChange}
              onBlur={handleProductChange}
              style={{ width: "50px" }}
            />
          </SingleCell>
          {/* ========== */}
          <Tooltip title="Trailers">
            <SingleCell flex="1" sx={{ background: colors.primary[400] }}>
              {row.trailers}
            </SingleCell>
          </Tooltip>
        </Box>
        {/* =====  Expected data  ========*/}
        <Box display="flex" flex="1">
          <Tooltip title="Expected Cases">
            <SingleCell flex="1">{row.calculatedCases}</SingleCell>
          </Tooltip>
          <Tooltip
            title={`${
              warningBackground
                ? "Not enough data to calculate"
                : "Expected Pallets"
            }`}
          >
            <SingleCell
              flex="1"
              sx={{
                borderRight: `1px dashed ${colors.primary[400]}`,
                borderLeft: `1px dashed ${colors.primary[400]}`,
                background: warningBackground,
              }}
            >
              {row.calculatedPallets}
            </SingleCell>
          </Tooltip>
          <Tooltip title="Expected Trailers">
            <SingleCell flex="1" sx={{ background: colors.primary[400] }}>
              {row.expectedTrailers}
            </SingleCell>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(EditableRow);
