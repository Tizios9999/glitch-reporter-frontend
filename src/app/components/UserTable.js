import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import EditDialog from "./EditUserDialog";

const UserTable = ({ users }) => {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedUser(null);
    setEditDialogOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.roles.join(", ")}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(user)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedUser && (
        <EditDialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UserTable;
