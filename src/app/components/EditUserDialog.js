import React, { useState } from "react";
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

const EditUserDialog = ({ open, onClose, user }) => {
  const [selectedRole, setSelectedRole] = useState(user.roles[0].name || ""); // Assuming user.roles[0] is the selected role

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSave = () => {
    // Call your API or update logic here with the updated role
    // After updating, you can close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Role for {user.username}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
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
