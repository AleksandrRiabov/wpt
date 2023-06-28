import { Box, Button, Typography } from "@mui/material";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import { useDeleteTrailerMutation } from "../../state/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  trailerId: string;
  trailerNumber: string;
  open: boolean;
  handleClose: () => void;
};

const DeleteModalPopUp = ({
  trailerId,
  trailerNumber,
  open,
  handleClose,
}: Props) => {
  const [deleteTrailer, { isLoading, error, isSuccess }] =
    useDeleteTrailerMutation();

  const navigate = useNavigate();

  const handleDeleteTrailer = () => {
    deleteTrailer(trailerId);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    }
  }, [isSuccess, navigate]);

  return (
    <ModalWrapper open={open} handleClose={handleClose}>
      {isSuccess ? (
        <Box padding="15px">
          <Typography variant="h3">Trailer Has Been Deleted..</Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3">DELETE Trailer {trailerNumber}?</Typography>
          <Box display="flex" justifyContent="space-around" padding="20px 5px">
            <Button
              disabled={isLoading}
              onClick={handleDeleteTrailer}
              variant="contained"
              sx={{ background: "red" }}
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              disabled={isLoading}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
          {isLoading && <Typography variant="h3">Please Wait...</Typography>}
          {error && (
            <Typography variant="h3" sx={{ color: "red" }}>
              Error.. Could not delete trailer.
            </Typography>
          )}
        </Box>
      )}
    </ModalWrapper>
  );
};

export default DeleteModalPopUp;
