import { Alert, Snackbar } from "@mui/material";

type Props = {
  errorMessage: string;
  successMessage: string;
  handleCloseSnackbar: (name: "success" | "error") => void;
};

const Notifications = ({
  errorMessage,
  successMessage,
  handleCloseSnackbar,
}: Props) => {
  return (
    <>
      {errorMessage && (
        <Snackbar
          open={errorMessage.length > 0}
          autoHideDuration={4000}
          onClose={() => handleCloseSnackbar("error")}
        >
          <Alert severity="error"> {errorMessage}</Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={successMessage.length > 0}
          autoHideDuration={6000}
          onClose={() => handleCloseSnackbar("success")}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Notifications;
