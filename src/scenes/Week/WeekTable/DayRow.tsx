import { Box, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";

type Props = {
  day: string;
  date: string;
  cases: string;
  pallets: string;
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
    borderRight: "1px solid",
    textTransform: "uppercase",
  };

  const rowStyle = {
    "&:hover": {
      fontWeight: 900,
      fontSize: "1rem",
    },
    fontSize: isHeader ? "1rem" : "inherit",
    fontWeight: isHeader ? "900" : "inherit",
  };

  return (
    <Box
      display="flex"
      textAlign="center"
      borderTop="1px solid"
      borderBottom={isLastRow ? "1px solid" : "none"}
      minWidth="600px"
      sx={rowStyle}
    >
      <Box
        sx={{
          ...cellStyle,
          background: colors.primary[800],
          borderLeft: "1px solid",
        }}
      >
        {day}
      </Box>
      <Box sx={{ ...cellStyle, background: colors.primary[700] }}>{date}</Box>
      <Box sx={{ ...cellStyle, background: colors.primary[500] }}>{cases}</Box>
      <Box sx={{ ...cellStyle, background: colors.primary[400] }}>
        {pallets}
      </Box>
      <Box sx={{ ...cellStyle, flex: 0.7, background: colors.primary[400] }}>
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
