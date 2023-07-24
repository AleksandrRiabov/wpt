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
  // State to manage input values
  const [inputsValue, setInputsValue] = useState({
    pallets: row.pallets || "",
    cases: row.cases || "",
  });

  // Get the 'date' from URL parameters
  const { date } = useParams();

  // Update the input values whenever the 'date', 'pallets', or 'cases' change
  useEffect(() => {
    setInputsValue({
      pallets: row.pallets || "",
      cases: row.cases || "",
    });
  }, [date, row.pallets, row.cases]);

  // Extract theme and color tokens from the MUI theme
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  // Event handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the value is a number, set the state
    if (!isNaN(Number(value))) {
      const positiveValue = +value.trim() > 0 ? value : "";
      setInputsValue((prev) => ({ ...prev, [name]: positiveValue }));
    }
  };

  // Event handler for product change (invoked when inputs lose focus)
  const handleProductChange = () => {
    updateProduct({
      name: row.name,
      pallets: inputsValue.pallets,
      cases: inputsValue.cases,
    });
  };

  // Determine the background color for error and warning states
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
            {/* Display the product name with ellipsis for overflow */}
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "70px", md: "140px" },
              }}
            >
              {row.name}
            </Typography>
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
            {/* Input for 'cases' with number type */}
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
            {/* Input for 'pallets' with number type */}
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
          {/* Tooltip for displaying 'trailers' information */}
          <Tooltip title="Trailers">
            <SingleCell flex="1" sx={{ background: colors.primary[400] }}>
              {row.trailers}
            </SingleCell>
          </Tooltip>
        </Box>
        {/* =====  Expected data  ========*/}
        <Box display="flex" flex="1">
          {/* Tooltip for displaying 'expected cases' information */}
          <Tooltip title="Expected Cases">
            <SingleCell flex="1">{row.calculatedCases}</SingleCell>
          </Tooltip>
          {/* Tooltip for displaying 'expected pallets' information (with warning if no data) */}
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
          {/* Tooltip for displaying 'expected trailers' information */}
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
