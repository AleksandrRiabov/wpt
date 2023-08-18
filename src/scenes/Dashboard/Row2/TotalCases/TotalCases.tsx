import { Box, Typography, useTheme } from "@mui/material";
import PieChartComponent from "./PieChartComponent";
import useTrailerCasesLogic from "./useTrailerCasesLogic";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { tokens } from "../../../../theme";

const TotalCases = () => {
  const { isError, chartData } = useTrailerCasesLogic();

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Box height="100%">
      <Box
        sx={{
          height: "20%",
          display: "flex",
          alignItems: "flex-end",
          maxWidth: "500px",
          margin: "0 auto",
          padding: { xs: "0 5px", sm: "0 10px" },
        }}
      >
        <Typography
          flex="1"
          variant="h3"
          textAlign="center"
        >{`Total cases sent in `}</Typography>

        {/* Date Switcher */}
        <Box
          flex="1"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
        >
          <ArrowBack
            color="secondary"
            sx={{ cursor: "pointer", fontSize: "1.5rem" }}
          />
          <Typography
            variant="h2"
            sx={{ padding: "0 20px", color: colors.secondary[500] }}
          >
            {" "}
            2023
          </Typography>
          <ArrowForward
            color="secondary"
            sx={{ cursor: "pointer", fontSize: "1.5rem" }}
          />
        </Box>
      </Box>
      <Box height="80%">
        <PieChartComponent data={chartData} />
      </Box>
    </Box>
  );
};

export default TotalCases;
