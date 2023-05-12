import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTrailersDataQuery } from "../../state/api";
import {
  Box,
  Button,
  Container,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
import FlexCenterCenter from "../../components/FlexCenterCenter/FlexCenterCenter";
import EditInfoSection from "./EditInfoSection";
import { GetTrailersDataResponse } from "../../state/types";
import { PageHeader } from "../../components";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import { tokens } from "../../theme";

type Props = {};

const EditTrailer = (props: Props) => {
  const { id } = useParams();
  const data = useGetTrailersDataQuery(`_id=${id}`);
  const trailer = data && data.data && data.data[0];

  const [editTrailerData, setEditTrailerData] = useState<
    GetTrailersDataResponse | undefined
  >(trailer);

  useEffect(() => {
    setEditTrailerData(trailer);
  }, [trailer]);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [e.target.name]: e.target.value });
  };

  const handleExtraCostChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({
      ...editTrailerData,
      extraCost: {
        ...editTrailerData.extraCost,
        [e.target.name]: {
          ...editTrailerData.extraCost[e.target.name],
          cost: parseInt(e.target.value),
        },
      },
    });
  };

  const handleCheckbox = (name: "alcohol" | "cert") => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [name]: !editTrailerData[name] });
  };

  const handleDateChange = (
    key: "sentDate" | "deliveryDate" | "clearance" | "received",
    date: Date | null
  ) => {
    if (!editTrailerData) return;
    setEditTrailerData({ ...editTrailerData, [key]: date });
  };

  return (
    <Container maxWidth="xl">
      <PageHeader title="Edit Trailer" />
      <DashboardBox>
        <Box p="20px">
          {data.isLoading ? (
            <FlexCenterCenter>
              <Typography variant="h3">Loading...</Typography>
            </FlexCenterCenter>
          ) : !trailer ? (
            <FlexCenterCenter>
              <Typography variant="h4">
                We're sorry, but the trailer you're trying to access is not
                available. It may have been removed or may have never existed.
                Please check the ID and try again, or contact our support team
                if you need further assistance.
              </Typography>
            </FlexCenterCenter>
          ) : (
            <Box display={"flex"}>
              <EditInfoSection
                trailer={editTrailerData}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleCheckbox={handleCheckbox}
                handleExtraCostChange={handleExtraCostChange}
              />
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "50%",
            maxWidth: "300px",
            padding: "10px",
            margin: "0 auto",
          }}
          onClick={() => console.log(editTrailerData)}
        >
          Update Details
        </Button>
      </DashboardBox>
    </Container>
  );
};

export default EditTrailer;
