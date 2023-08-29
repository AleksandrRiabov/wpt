import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getStartOfWeekDate } from "../../helpers";
import useSendAnalytics from "../../hooks/useSendAnalytics";
import dashboardScreen from "../../assets/images/dashboardScreen.png";

// Default date from in the query
const today = format(new Date(), "dd-MM-yyyy");
const startOfThisWeek = getStartOfWeekDate(new Date());

const Home = () => {
  useSendAnalytics({ title: "Home Page" });
  return (
    <Box
      className="page mainBackgroundImg"
      sx={{
        width: "100%",
        display: "flex",
        marginBottom: "-30px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { lg: "row", xs: "column" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: { md: "20px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "4rem", lg: "6rem" },
                textShadow: "1px 1px",
              }}
            >
              WPT - Warehouse Planning Tool
            </Typography>
            <Typography variant="h4">
              Designed to assist warehouse managers in streamlining the process
              of estimating the required number of trailers at the time of
              receiving an order.
            </Typography>
            <Box sx={{ padding: "30px 0" }}>
              <Link to={`/day/${today}`}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: "primary.contrastText",
                    marginRight: "50px",
                  }}
                >
                  Today
                </Button>
              </Link>
              <Link to={`/week/${startOfThisWeek}`}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: "primary.contrastText",
                  }}
                >
                  This Week
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: { md: "20px" },
            }}
          >
            <img src={dashboardScreen} alt="Screenshot" width="100%" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
