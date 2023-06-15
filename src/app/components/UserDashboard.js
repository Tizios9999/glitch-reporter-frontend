'use client'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';

import TicketRow from './TicketRow';
import CheckboxFilters from './CheckboxFilters';

import tickets from '../testdata/tickets';
import priority from '../testdata/priority';

export default function UserDashboard() {

const ticketData = Array.from(tickets);

    return (
      <div>
        <CssBaseline />
        <Container maxWidth="xl" sx={{
            backgroundColor: "#bdbdbd",
            borderRadius: "5px",
            display: "grid",
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"sidebar main main main main"`,
        }}>
            <Box sx={{
                gridArea: 'sidebar'
            }}>
              <Button variant="contained" disableElevation color="success" size="large" endIcon={<AddCircleIcon />}>
                New ticket
              </Button>
              <CheckboxFilters name="priority" filters={priority} />
            </Box>
            <Box sx={{
                gridArea: 'main',
                border: 1,
                width: '100%'
            }}>

                <TicketRow type="header" />

                {ticketData.map((ticket) => (
                <TicketRow type="data" data={ticket} />
              ))}

            </Box>

        </Container>
      </div>
    )
}