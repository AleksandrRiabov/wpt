import { Box, Container } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import EditableProductsList from "./EditableProductList/EditableProductsList";
import { useState } from "react";
import DayChart from "./DayChart";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";

const Day = () => {
  // UseEffect to refetch if date changes to avoid using cached data
  const [openChart, setOpenChart] = useState(false);

  const handleOpenChart = () => setOpenChart(true);
  const handleCloseChart = () => setOpenChart(false);

  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title={`Day `} />
      <Box maxWidth="xs">
        <Box>
          <EditableProductsList handleOpenChart={handleOpenChart} />
          <ModalWrapper open={openChart} handleClose={handleCloseChart}>
            <DayChart />
          </ModalWrapper>
        </Box>
      </Box>
    </Container>
  );
};

export default Day;
