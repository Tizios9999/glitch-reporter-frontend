/* IMPORTS */
// React
import React from "react";
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Error modal that is shown when an error is generated.

*/

function ErrorModal({ open, handleClose, errorMessage }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <p>{errorMessage}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
