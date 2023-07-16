import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

const Loading = () => {

    return (
            <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress color="primary" size={250} />
           </Container>
    )
}

export default Loading;