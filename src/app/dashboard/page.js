"use client";
/* IMPORTS */
// React
// Next.js
// External services
// Internal services
// Components
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";
import UserDashboard from "../components/UserDashboard";
// Internal functions
// Contexts
// Material UI Components
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

This page contains the ticket dashboard.
As of now the only component inside is the User Dashboard,
but might contain an Agent only dashboard based on the
logged user in the future.

*/

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Container component="main" maxWidth="l">
        <CssBaseline />
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <UserDashboard />
        </Box>
      </Container>
    </ProtectedRoute>
  );
}
