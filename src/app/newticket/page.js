'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import CustomSelect from "../components/CustomSelect"

import priority from '../testdata/priority'
import topic from '../testdata/topic'

const NewTicket = () => {

    const { push } = useRouter();

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

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Form submitted: ",formState)
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
            <CustomSelect required={true} values={priority} width="250px" name="priority" label="Issue priority" currentValue={formState.priority} onChange={onChangeHandler} />
            <CustomSelect required={true} values={topic} width="250px" name="topic" label="Area of interest" currentValue={formState.topic} onChange={onChangeHandler} />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              minRows={10}
              placeholder="Please describe here the issue encountered and the steps to reproduce it."
              id="description"
              label="Issue description"
              name="description"
              value={formState.description}
              onChange={onChangeHandler}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '50px'}}>
                <Button
                type="submit"
                variant="contained"
                sx={{ mb: 2, width: '200px' }}
                >Create Ticket</Button>
                <Button
                variant="outlined"
                sx={{ mb: 2, width: '200px' }}
                onClick={() => {push('./dashboard')}}
                >Abort</Button>
            </Box>
           </Box>
         </Box>
        </Container>
    )
}

export default NewTicket;