import { Box, CircularProgress, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import useTrailerStatsLogic from "./useTrailerStatsLogic";
import SingleStatsLine from "./SingleStatsLine";

const TrailersStats = () => {
  const {
    totalExtraCost,
    totalTrailers,
    avgCaseDeliveryCost,
    isError,
    isFetching,
    handleDateChange,
    currentDateStr,
    monthlyTrailersCost,
  } = useTrailerStatsLogic();

  return (
    <Box
      padding="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
    >
      <Box
        flex="1"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        maxWidth="500px"
      >
        <ArrowBack
          color="secondary"
          onClick={() => handleDateChange("left")}
          sx={{ cursor: "pointer", fontSize: "2rem" }}
        />
        <Typography variant="h2" color="secondary">
          {currentDateStr}
        </Typography>
        <ArrowForward
          color="secondary"
          onClick={() => handleDateChange("right")}
          sx={{ cursor: "pointer", fontSize: "2rem" }}
        />
      </Box>
      {isFetching ? (
        <Box
          flex="3"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography flex="3">Error..</Typography>
      ) : (
        <Box
          flex="3"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <SingleStatsLine label="Total Trailers Sent:" value={totalTrailers} />

          <SingleStatsLine
            label="Total cost:"
            value={monthlyTrailersCost}
            currency="£"
          />

          <SingleStatsLine
            label="Extra Charges:"
            value={totalExtraCost}
            currency="£"
            color={totalExtraCost ? "red" : undefined}
          />

          <SingleStatsLine
            label="Avg. Case Delivery cost:"
            value={avgCaseDeliveryCost}
            currency="£"
            decimals={2}
          />
        </Box>
      )}
    </Box>
  );
};

export default TrailersStats;
