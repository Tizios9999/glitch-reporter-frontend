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

  const HEADERS = ["Id", "Username", "Roles", "Edit"];

  const centeredCell = (content, hasBorder) => {
    return (
      <TableCell
        sx={{
          textAlign: "center",
          borderRight: hasBorder ? "1px solid lightgray" : "none",
        }}
      >
        {content}
      </TableCell>
    );
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {HEADERS.map((header, key) => {
                return (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "lightgray",
                      borderRight:
                        key + 1 === HEADERS.length ? "none" : "1px solid white",
                    }}
                  >
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {centeredCell(user.id, true)}
                {centeredCell(user.username, true)}

                {centeredCell(user.roles[0].name, true)}
                {centeredCell(
                  <Button
                    variant="contained"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                )}
                {/* <TableCell>
                  
                </TableCell> */}
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
