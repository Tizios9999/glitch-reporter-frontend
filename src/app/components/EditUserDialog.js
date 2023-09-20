"use client";
/* IMPORTS */
// React
import React, { useState, useContext } from "react";
// Next.js
// External services
// Internal services
import { changeRole, deleteUser } from "../services/users.service";
// Components
import AlertDialog from "./AlertDialog";
// Internal functions
// Contexts
import { AppContext } from "../contexts/AppContext";
// Material UI Components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Modal used to modify the user role or to delete it.
Opens from the UserTable component, to be used only by Admins.

*/

const EditUserDialog = ({ open, onClose, user }) => {
  const [appState, appDispatch] = useContext(AppContext);
  const [selectedRole, setSelectedRole] = useState(user.roles[0].name || ""); // Assuming user.roles[0] is the selected role

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleDelete = () => {
    console.log("Deleting user: ", user.id);

    setShowAlertDialog(true);
  };

  const handleSave = () => {
    console.log("selected role ", selectedRole);
    console.log("user id", user.id);

    changeRole(user.id, selectedRole)
      .then((response) => {
        onClose();
        appDispatch({
          type: "SET_MESSAGE",
          payload: "User role changed successfully!",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        appDispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
      });
  };

  const handleDeleteConfirmed = () => {
    deleteUser(user.id)
      .then((response) => {
        onClose();
        appDispatch({
          type: "SET_MESSAGE",
          payload: "User deleted successfully!",
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        appDispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Role for {user.username}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexFlow: "column" }}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="role"
            name="role"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <FormControlLabel
              value="ROLE_USER"
              control={<Radio />}
              label="User"
            />
            <FormControlLabel
              value="ROLE_AGENT"
              control={<Radio />}
              label="Agent"
            />
            <FormControlLabel
              value="ROLE_ADMIN"
              control={<Radio />}
              label="Admin"
            />
          </RadioGroup>
        </FormControl>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ marginTop: "20px" }}
        >
          DELETE USER
        </Button>
      </DialogContent>
      {showAlertDialog && (
        <AlertDialog
          message="Are you sure you want to delete this user? This action cannot be undone."
          onClose={() => setShowAlertDialog(false)}
          onProceed={handleDeleteConfirmed}
        />
      )}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
