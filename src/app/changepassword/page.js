"use client";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function PasswordChangeForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [errorsList, setErrorsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessful(false);

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("New password:", newPassword);
    console.log("New password confirmation:", newPasswordConfirmation);

    const formData = {
      username: username,
      email: email,
      password: newPassword,
      passwordConfirmation: newPasswordConfirmation,
    };

    const errors = validateForm(formData);

    /* If there are no errors, the form will be sent to the backend,
       alternatively the errors will be collected on the errorsList 
       state and shown on the alerts. */
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: "80px" }}>
      <Paper elevation={3} style={{ padding: "20px", margin: "auto" }}>
        <Typography variant="h5">Request a new Password</Typography>
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: "5px" }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="New password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="New password confirmation"
                name="newPasswordConfirmation"
                type="password"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                required
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Submit request
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default PasswordChangeForm;
