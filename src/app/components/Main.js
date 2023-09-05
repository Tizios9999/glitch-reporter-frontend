"use client";
/* IMPORTS */
// React
import { useContext, useEffect } from "react";
// Next.js
import { useRouter } from "next/navigation";
// External services
// Internal services
// Components
// Internal functions
import checkVisibility from "../common/js/checkVisibility";
// Contexts
import { AuthContext } from "../contexts/AuthContext";
// Material UI Components
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Main page. Welcomes the user.

*/

export default function Main() {
  const [state, dispatch, register, login, logout] = useContext(AuthContext);

  const { push } = useRouter();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome to Glitch Reporter{state.user && `, ${state.user.username}`}!
        </Typography>
        {checkVisibility(state, "Not logged in") ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                push("./login");
              }}
            >
              Login
            </Button>
            <p>Or</p>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                push("./register");
              }}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              push("./dashboard");
            }}
          >
            Go to your dashboard
          </Button>
        )}
      </Box>
    </Container>
  );
}
