"use client";
/* IMPORTS */
// React
import React, { useState, useContext } from "react";
// Next.js
import { useRouter } from "next/navigation";
// External services
// Internal services
// Components
import PublicRoute from "../protectedRoutes/PublicRoute";
import Copyright from "../components/Copyright";
// Internal functions
// Contexts
import { AuthContext } from "../contexts/AuthContext";
// Material UI Components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Login page.

*/

export default function Login() {
  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  const [authState, authDispatch, authRegister, login, logout] =
    useContext(AuthContext);

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    authDispatch({
      type: "SET_LOADING",
      payload: true,
    });

    login(username, password)
      .then(() => {
        push("/");
        authDispatch({
          type: "SET_LOADING",
          payload: false,
        });
      })
      .catch((error) => {
        authDispatch({
          type: "LOGIN_FAIL",
        });
        authDispatch({
          type: "SET_LOADING",
          payload: false,
        });
      });
  };

  return (
    <PublicRoute>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={onChangeUsername}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="./changepassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </PublicRoute>
  );
}
