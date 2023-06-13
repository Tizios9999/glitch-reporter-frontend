'use client';
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { register } from "../actions/auth";
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
// import { ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Davide Santonocito
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

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
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessful(false);
    
    const formData = {
        username: username,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
    }

    // validate

    

    // if ok push to internal section

    if (validateForm(formData)) {

        dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
          clearForm();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    
  };

  const validateForm = (formData) => {

    let valid = true;

    const currentErrors = [];

    if (!validatePassword(formData.password)) {
        valid = false;
        currentErrors.push('The specified password is not valid. Should be minimum 8 characters long and meet at least two of these conditions: must have an uppercase character, a lowercase character, have a number, have a special character');
    }

    if (!validateUsername(formData.username)) {
        valid = false;
        currentErrors.push(`Invalid username. Should be minimum 3 characters, with no special characters`);
    }

    if (!validateEmail(formData.email)) {
        valid = false;
        currentErrors.push("The email provided is incorrect, check your spelling and try again");
    }

    if (formData.password !== formData.passwordConfirmation) {
        valid = false;
        currentErrors.push("The password provided and the password confirmation do not match. Please check for any errors and try again.")
    }

    setErrorsList(currentErrors);

    return valid;
  }

  function validatePassword(password) {
    let conditionsMet = 0;
  
    if (/[a-z]/.test(password)) {
      conditionsMet++;
    }
  
    if (/[A-Z]/.test(password)) {
      conditionsMet++;
    }
  
    if (/\d/.test(password)) {
      conditionsMet++;
    }
  
    if (/[@$!%*?&]/.test(password)) {
      conditionsMet++;
    }
  
    return password.length >= 8 && conditionsMet >= 2;
  }

  function validateUsername(username) {
    const usernameRegex = /^[A-Za-z\d]{3,}$/;

    const isValid = usernameRegex.test(username);

    return isValid;
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValid = emailRegex.test(email);

    return isValid;
  }

  function clearForm() {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          {errorsList.length > 0 && errorsList.map((error, index) => (
            <Alert key={index} style={{width: "100%", textAlign: "center"}} severity="error">{error}</Alert>
            ))}

          {successful && <Alert severity="success" style={{width: "100%", textAlign: "center", marginTop: "15px"}} color="success">
            Registration successful!
          </Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                <Link href="#" style={{textAlign: "center"}} variant="body2">
                  {"Already Registered? Click here to login."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )} */}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}