'use client'

import { useState } from "react"

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import CustomSelect from "../components/CustomSelect"

import priority from '../testdata/priority'
import topic from '../testdata/topic'

const NewTicket = () => {

    const initialState = {
        subject: "",
        priority: "medium",
        topic: "Other",
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
             justifyContent: 'center',
             backgroundColor: "pink",
           }}
         >
           <Typography component="h1" variant="h5">
            New Ticket
           </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%', display: "flex", flexFlow: 'column nowrap', alignItems: 'center', gap: '30px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Ticket subject"
              name="subject"
              value={formState.subject}
              onChange={onChangeHandler}
              autoFocus
            />
            <CustomSelect values={priority} name="priority" label="Issue priority" currentValue={formState.priority} onChange={onChangeHandler} />
            <CustomSelect values={topic} name="topic" label="Area of interest" currentValue={formState.topic} onChange={onChangeHandler} />
           </Box>
         </Box>
        </Container>
    )
}

export default NewTicket;