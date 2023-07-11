import { Box, Container } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import EditableProductsList from "./EditableProductList/EditableProductsList";

const Day = () => {
  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title={`Day `} />
      <Box maxWidth="xs">
        <Box
          sx={{
            overflowX: "auto",
          }}
        >
          <EditableProductsList />
        </Box>
      </Box>
    </Container>
  );
};

export default Day;
