import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const EditUserDialog = ({ open, onClose, user }) => {
  const [selectedRoles, setSelectedRoles] = useState(user.roles);

  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSave = () => {
    // Call your API or update logic here with the updated roles
    // After updating, you can close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Roles for {user.username}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRoles.includes("user")}
                onChange={() => handleRoleChange("user")}
              />
            }
            label="User"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRoles.includes("agent")}
                onChange={() => handleRoleChange("agent")}
              />
            }
            label="Agent"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRoles.includes("admin")}
                onChange={() => handleRoleChange("admin")}
              />
            }
            label="Admin"
          />
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
