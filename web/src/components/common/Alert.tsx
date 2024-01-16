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
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
