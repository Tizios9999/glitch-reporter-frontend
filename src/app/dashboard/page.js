
'use client'
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import UserDashboard from '../components/UserDashboard'

import ProtectedRoute from '../protectedRoutes/ProtectedRoute'

export default function Dashboard() {

  const { push } = useRouter();

    return (
      <ProtectedRoute>
      <Container component="main" maxWidth="l">
        <CssBaseline />
        <Box sx={{
          padding: "10px"
        }}>
        <UserDashboard />
        </Box>
      </Container>
      </ProtectedRoute>
    )
    
}