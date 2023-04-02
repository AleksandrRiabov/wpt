import { PageHeader } from "../../components";
import { Container, Box } from "@mui/material";

type Props = {};

const gridTemplate = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`;

const Dashboard = (props: Props) => {
  return (
    <Box
      className="page"
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <PageHeader title="Dashboard" />
        <Box
          width="100%"
          height="100%"
          display="grid"
          gap="1.5rem"
          sx={{
            gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
            gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
            gridTemplateAreas: gridTemplate,
          }}
        >
          <Box bgcolor="teal" gridArea="a">de</Box>
          <Box bgcolor="teal" gridArea="b">d</Box>
          <Box bgcolor="teal" gridArea="c">d</Box>
          <Box bgcolor="teal" gridArea="d"></Box>
          <Box bgcolor="teal" gridArea="e"></Box>
          <Box bgcolor="teal" gridArea="f"></Box>
          <Box bgcolor="teal" gridArea="g"></Box>
          <Box bgcolor="teal" gridArea="h"></Box>
          <Box bgcolor="teal" gridArea="i"></Box>
          <Box bgcolor="teal" gridArea="j"></Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
