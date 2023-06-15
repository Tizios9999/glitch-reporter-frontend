'use client'
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
              <CheckboxFilters name="status" filters={status} />
              <CheckboxFilters name="customer" filters={["opened by me", "opened by others"]} />
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
        <Container maxWidth="xl" sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "pink",
            padding: "5px"
        }}>
          <Pagination count={10} color="secondary" />
        </Container>
      </div>
    )
}