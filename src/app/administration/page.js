"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import UserTable from "../components/UserTable";

import ProtectedRoute from "../protectedRoutes/ProtectedRoute";

export default function Administration() {
  const { push } = useRouter();

  const users = [
    { id: 1, username: "user1", roles: ["user"] },
    { id: 2, username: "user2", roles: ["user", "agent"] },
    { id: 3, username: "admin1", roles: ["admin"] },
  ];

  return (
    <ProtectedRoute>
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
          <UserTable users={users} />
        </Box>
      </Container>
    </ProtectedRoute>
  );
}
