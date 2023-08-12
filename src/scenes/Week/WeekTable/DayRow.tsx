import { Box, Button, Tooltip, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";

type Props = {
  day: string;
  date: string;
  cases: string | number;
  pallets: string | number;
  withBtn?: boolean;
  isLastRow?: boolean;
  isHeader?: boolean;
};

const DayRow = ({
  day,
  date,
  pallets,
  cases,
  withBtn,
  isLastRow,
  isHeader,
}: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const cellStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: isHeader ? "20px 10px" : "10px",
    borderRight: `1px dashed ${colors.primary[500]}`,
    textTransform: "uppercase",
  };

  const rowStyle = {
    "&:hover": {
      color: colors.secondary[500],
    },
    fontSize: isHeader ? "0.95rem" : "inherit",
    color: isHeader ? colors.secondary[500] : "inherit",
  };

  return (
    <Box
      display="flex"
      textAlign="center"
      borderTop={
        isHeader
          ? `1px solid ${colors.primary[400]}`
          : `1px dashed ${colors.primary[400]}`
      }
      borderBottom={isLastRow ? `1px solid ${colors.primary[400]}` : "none"}
      minWidth="600px"
      sx={rowStyle}
    >
      <Box
        sx={{
          ...cellStyle,
          background: colors.primary[800],
          borderLeft: `1px solid ${colors.primary[400]}`,
        }}
      >
        {day}
      </Box>
      <Box sx={{ ...cellStyle, background: colors.primary[600] }}>{date}</Box>
      <Tooltip title={`Total sum of all products for ${day} ${date}`}>
        <Box sx={{ ...cellStyle, background: colors.primary[600] }}>
          {cases}
        </Box>
      </Tooltip>
      <Tooltip title={`Total pallets for ${day} ${date}`}>
        <Box sx={{ ...cellStyle, background: colors.primary[600] }}>
          {pallets}
        </Box>
      </Tooltip>
      <Box
        sx={{
          ...cellStyle,
          flex: 0.7,
          background: colors.primary[600],
          borderRight: `1px solid ${colors.primary[400]}`,
        }}
      >
        {withBtn && (
          <Link to={`/day/${date}`}>
            <Button variant={"contained"} color={"secondary"}>
              Day Info
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default DayRow;
