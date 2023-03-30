import { PageHeader } from "../../components";
import { Container, Box } from "@mui/material";
import { Stack } from "@mui/system";

const Dashboard = () => {
  return (
    <Box
      className="page"
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <PageHeader title="Dashboard" />
        <Stack>ghj</Stack>
      </Container>
    </Box>
  );
};

export default Dashboard;
