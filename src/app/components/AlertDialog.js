/* IMPORTS */
// React
import * as React from "react";
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Alert dialog used to ask if the user wants to continue with
a certain choice (used for critical decisions)

*/

export default function AlertDialog({ message, onProceed }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Deleting user"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onProceed} color="error">
          Proceed
        </Button>
        <Button onClick={onClose} autoFocus>
          Nevermind
        </Button>
      </DialogActions>
    </Dialog>
  );
}
