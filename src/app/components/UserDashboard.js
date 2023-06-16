'use client'
import { useRouter } from 'next/navigation'; 

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import TicketRow from './TicketRow';
import CheckboxFilters from './CheckboxFilters';

import tickets from '../testdata/tickets';
import priority from '../testdata/priority';
import status from '../testdata/status';

export default function UserDashboard() {

    const { push } = useRouter();

    const ticketData = Array.from(tickets);

    return (
      <div>
        <CssBaseline />
        <Container maxWidth="xl" sx={{
            borderRadius: "5px",
            display: "grid",
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"sidebar main main main main"`,
        }}>
            <Box sx={{
                gridArea: 'sidebar'
            }}>
              <Button variant="contained" disableElevation color="success" size="large" endIcon={<AddCircleIcon />} onClick={() => {push('./newticket')}}>
                New ticket
              </Button>
              <CheckboxFilters name="priority" filters={priority} />
              <CheckboxFilters name="status" filters={status} />
              <CheckboxFilters name="customer" filters={["opened by me", "opened by others"]} />
            </Box>
            <Box sx={{
                gridArea: 'main',
                width: '100%',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>            
                    <TicketRow type="header" />
                    {ticketData.map((ticket) => (
                    <TicketRow type="data" data={ticket} />
                ))}
                </Box>
                <Container maxWidth="xl" sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px"
                }}>
                    <Pagination count={10} color="secondary" />
                </Container>
            </Box>
            
        </Container>
        
      </div>
    )
}