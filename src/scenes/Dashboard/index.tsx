import PageHeader from "../../components/PageHeader/PageHeader";
import { Container, Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1/Row1";
import Row2 from "./Row2/Row2";
import Row3 from "./Row3/Row3";


const gridTemplateLargeScreen = `
"a b c"
"a b c"
"a b c"
"a b f"
"d d f"
"d d f"
"d d i"
"d d i"
"d d j"
"d d j"
`;

const gridTemplateSmallScreen = `
"a"
"a"
"a"
"a"
"b"
"b"
"b"
"b"
"c"
"c"
"c"
"d"
"d"
"d"
"d"
"f"
"f"
"f"
"i"
"i"
"j"
"j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: "40px" }}>
      <PageHeader title="Dashboard" />
      <Box
        width="100%"
        height="100%"
        display="grid"
        gap="1.5rem"
        sx={
          isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreen,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreen,
              }
        }
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    </Container>
  );
};

export default Dashboard;
