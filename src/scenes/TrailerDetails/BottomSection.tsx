import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteModalPopUp from "./DeleteModalPopUp";
import { tokens } from "../../theme";
import { GetTrailersDataResponse } from "../../state/types";

type Props = {
  id: string;
  trailer: GetTrailersDataResponse;
  setOpenDeleteModal: (status: boolean) => void;
  openDeleteModal: boolean;
};

const BottomSection = ({
  id,
  trailer,
  setOpenDeleteModal,
  openDeleteModal,
}: Props) => {
  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  return (
    <Box
      flex="1"
      mb="40px"
      sx={{
        display: "flex",
        justifyContent: { md: "space-between", xs: "center" },
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Comments */}
      <Container>
        <Typography variant="h4">Comments:</Typography>
        <Typography variant="body1" color={colors.secondary[300]}>
          {trailer.comments}
        </Typography>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          pt: { xs: "20px" },
          mt: "10px",
          flexDirection: { xs: "column", lg: "row" },
          borderTop: { xs: "1px dashed  #6c8991", sm: "none" },
        }}
      >
        {/* Buttons */}
        <Box display="flex" justifyContent="space-around" width="240px">
          <Link to={`/trailer/${id}/edit`}>
            <Button variant="contained" color="secondary">
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => setOpenDeleteModal(true)}
            variant="contained"
            sx={{ color: "red" }}
          >
            Delete
          </Button>
        </Box>
        {/* Modal */}
        <DeleteModalPopUp
          trailerId={id}
          trailerNumber={trailer.trailerNumber}
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
        />
        {/* Edited / Created User Names */}
        <Box display="flex">
          <Box p="15px">
            <Typography>Created By:</Typography>
            <Typography variant="overline">
              {trailer?.createdBy?.name || trailer?.createdBy?.email}
            </Typography>
          </Box>
          <Box p="15px">
            <Typography>Last Edited By:</Typography>
            <Typography variant="overline">
              {trailer?.editedBy?.name || trailer?.editedBy?.email}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BottomSection;
