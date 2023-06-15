'use client'

import { useState } from "react"

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const NewTicket = () => {

    const initialState = {
        subject: "",
        priority: "normal",
        topic: "other",
        description: "",
    }
    
    const [formState, setFormState] = useState(initialState);
    
    function onChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
    
        console.log(formState)

        setFormState((prevState) => {
            return {
                ...prevState, [name]: value
            }
        })
    }
    
    // this function takes the property name and the value to set and changes the state property
    function setStateProperty(name, value) {
        setFormState((prevState) => {
            return {
                ...prevState, [name]: value
            }
        })
    }

    function handleSubmit() {

    }

    return (
        <Container component="main" maxWidth="md">
         <CssBaseline />
         <Box
           sx={{
             marginTop: 5,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             backgroundColor: "pink",
           }}
         >
           <Typography component="h1" variant="h5">
            New Ticket
           </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Ticket Subject"
              name="subject"
              value={formState.subject}
              onChange={onChangeHandler}
              autoFocus
            />

           </Box>
         </Box>
        </Container>
    )
}

export default NewTicket;