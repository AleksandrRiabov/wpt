import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

const Home = () => {
  return (
    <Box
      className="page home-page"
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
            <Typography variant="h6">
              Designed to assist warehouse managers in streamlining the process
              of estimating the required number of trailers at the time of
              receiving an order.
            </Typography>
            <Box sx={{ padding: "30px 0" }}>
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
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  color: "primary.contrastText",
                }}
              >
                This Week
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: { md: "20px" },
            }}
          >
            <img
              src="https://user-images.githubusercontent.com/61385379/213078370-f39f027b-a2dd-4dd1-a6d3-16cb4d0186b3.png"
              alt="Screenshot"
              width="100%"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
