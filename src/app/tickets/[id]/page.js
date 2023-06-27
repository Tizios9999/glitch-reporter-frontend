'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ticketsData from '../../testdata/tickets'
import { Container, CssBaseline, Typography, Box } from '@mui/material';

import TicketMessage from '../../components/TicketMessage'

const TicketPage = () => {

  const [id, setId] = useState(null);
  const [ticket, setTicket] = useState(null);
  const pathname = usePathname();

// To be moved in its own site

  let priorityColorBgMap = new Map()

  priorityColorBgMap.set('low', 'Green')
  priorityColorBgMap.set('medium', 'GoldenRod') 
  priorityColorBgMap.set('high', 'OrangeRed')
  priorityColorBgMap.set('critical', 'FireBrick')

  let priorityColorMap = new Map()

  priorityColorMap.set('low', 'Black')
  priorityColorMap.set('medium', 'Black') 
  priorityColorMap.set('high', 'White')
  priorityColorMap.set('critical', 'White')


  useEffect(() => {
    const fetchId = async () => {
      const pathnameArr = await pathname.split('/');
      const extractedId = pathnameArr[2];
      setId(extractedId);
    };

    fetchId();
  }, [pathname]);



  // Utilizza l'ID del ticket per recuperare i dati relativi a quel ticket
  useEffect(() => {
    const getTicketById = () => {
      const ticket = ticketsData.find((ticket) => ticket.ticketId === id);
      setTicket(ticket);
    };

    if (id) {
      getTicketById();
    }
  }, [id]);
  
  if (!id) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Loading ticket data...</div>;
  }

  return (
    <div>
      <CssBaseline />
      <Container size='xl'>
        <h1>#{id} - {ticket.ticketSubject}</h1>
        {/* Mostra i dettagli del ticket */}
        <Typography variant="body1" color="initial"><strong>Opened by:</strong> {ticket.openingUser}</Typography>
        <Typography variant="body1" color="initial"><strong>Priority:</strong> <span style={{ color: priorityColorMap.get(ticket.priority), backgroundColor: priorityColorBgMap.get(ticket.priority), padding: '3px'}}>{ticket.priority}</span></Typography>
        <Typography variant="body1" color="initial"><strong>Assigned to:</strong> {ticket.assignedTo}</Typography>
        <Typography variant="body1" color="initial"><strong>Created:</strong> {ticket.creationDate}</Typography>
        <Typography variant="body1" color="initial"><strong>Last updated:</strong> {ticket.lastUpdated}</Typography>
        
        <Box sx={{ mt: '50px', border: '1px solid black'}}>
        {ticket.messages.map((message) => {
          return (
            <TicketMessage messageData={message}/>
          )
        })}
        </Box>

        {console.log(ticket, 'ticket')}
      </Container>
    </div>
  );
};

export default TicketPage;