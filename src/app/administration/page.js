"use client";
/* IMPORTS */
// React
import { useState, useEffect } from "react";
// Next.js
// External services
// Internal services
import { getAll } from "../services/users.service";
// Components
import UserTable from "../components/UserTable";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";
// Internal functions
// Contexts
// Material UI Components
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

This is the Admin page, where only the administrator can enter and
manage certain settings.
*/
export default function Administration() {
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    getAll().then((response) => {
      setUsersList(response.data);
    });
  }, []);

  return (
    <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
      <Container component="main" maxWidth="l">
        <CssBaseline />
        <Box
          sx={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" color="initial">
            Admin board
          </Typography>
          {usersList && <UserTable users={usersList} />}
        </Box>
      </Container>
    </ProtectedRoute>
  );
}
