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
// Internal functions
import validateForm from "../common/js/validateForm";
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
import Alert from "@mui/material/Alert";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Register page.

*/

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Davide Santonocito
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register() {
  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [errorsList, setErrorsList] = useState([]);

  const [state, dispatch, register, login, logout] = useContext(AuthContext);

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangeEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirmation = (event) => {
    const passwordConfirmation = event.target.value;
    setPasswordConfirmation(passwordConfirmation);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessful(false);

    const formData = {
      username: username,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    // Validate form or receive a list of errors

    const errors = validateForm(formData);

    // if ok push to internal section

    if (errors.length === 0) {
      register(username, email, password)
        .then(() => {
          setSuccessful(true);
          clearForm();
        })
        .catch(() => {
          setSuccessful(false);
        });
    } else {
      setErrorsList(errors);
    }
  };

  function clearForm() {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  }

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
            Sign Up
          </Typography>

          {errorsList.length > 0 &&
            errorsList.map((error, index) => (
              <Alert
                key={index}
                style={{ width: "100%", textAlign: "center" }}
                severity="error"
              >
                {error}
              </Alert>
            ))}

          {successful && (
            <Alert
              severity="success"
              style={{ width: "100%", textAlign: "center", marginTop: "15px" }}
              color="success"
            >
              Registration successful!
            </Alert>
          )}

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
              autoFocus
              value={username}
              onChange={onChangeUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              value={email}
              onChange={onChangeEmail}
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Type here again your password"
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={onChangePasswordConfirmation}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="./login"
                  style={{ textAlign: "center" }}
                  variant="body2"
                >
                  {"Already Registered? Click here to login."}
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
