import { Alert, Snackbar } from "@mui/material";


type CommonAlertProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  open: boolean;
};

export default function CommonAlert(props: CommonAlertProps) {
  const { message, type, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      transitionDuration={500}

    >
      <Alert onClose={handleClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
