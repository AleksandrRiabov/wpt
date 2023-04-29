import React, { ReactNode } from "react";
import DashboardBox from "../dashboardBox/DashboardBox";
import { Box, Container } from "@mui/material";

type Props = {
  children: ReactNode;
  height?: string;
};

const FlexCenterCenter = ({ children, height = "400px" }: Props) => {
  return (
    <DashboardBox>
     <Container>
     <Box
        height={height}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p='20px'
      >
        {children}
      </Box>
     </Container>
    </DashboardBox>
  );
};

export default FlexCenterCenter;
