
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Main() {

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
          <Typography component="h1" variant="h5">
            Welcome to Glitch Reporter!
          </Typography>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>
          <p>Or</p>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
        </Box>
      </Container>
    )
    
}