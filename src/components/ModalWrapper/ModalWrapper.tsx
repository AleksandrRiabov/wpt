import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  minWidth: "350px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 6,
};

type Props = {
  children: string | JSX.Element | JSX.Element[];
  open: boolean;
  handleClose: () => void;
};

function ModalWrapper({ children, open, handleClose }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Close
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                padding: "3px",
              },
            }}
            color="secondary"
          />
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default ModalWrapper;