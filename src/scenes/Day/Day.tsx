import { useState } from "react";

import { Box, Container } from "@mui/material";

import PageHeader from "../../components/PageHeader/PageHeader";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import EditableProductsList from "./EditableProductList/EditableProductsList";
import DayChart from "./DayChart";

const Day = () => {
  // State to manage the visibility of the DayChart modal
  const [openChart, setOpenChart] = useState(false);

  // Event handlers for opening and closing the DayChart modal
  const handleOpenChart = () => setOpenChart(true);
  const handleCloseChart = () => setOpenChart(false);

  return (
    <Container maxWidth="xl" sx={{ minHeight: "85vh" }}>
      <PageHeader title={`Day `} />

      <Box>
        {/* Box for horizontal scrolling if needed */}
        <Box
          sx={{
            overflowX: "auto",
          }}
        >
          <EditableProductsList handleOpenChart={handleOpenChart} />

          {/* ModalWrapper component to show DayChart */}
          <ModalWrapper open={openChart} handleClose={handleCloseChart}>
            <DayChart />
          </ModalWrapper>
        </Box>
      </Box>
    </Container>
  );
};

export default Day;
