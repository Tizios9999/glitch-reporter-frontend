'use client'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ticketsData from '../../testdata/tickets'
import { Container, CssBaseline, Typography, Box, TextField, Button } from '@mui/material';

import TicketMessage from '../../components/TicketMessage'

const TicketPage = () => {

  const [id, setId] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
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

  function onNewMessageChangeHandler(event) {
    setNewMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

        console.log("Message submitted: ",newMessage)

        {/* Make use of firebase to handle files uploaded */}
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%', display: "flex", flexFlow: 'column nowrap', alignItems: 'center', gap: '30px' }}>
          <TextField
                margin="normal"
                fullWidth
                multiline
                minRows={10}
                placeholder="Add a new message here"
                id="newmessage"
                name="newmessage"
                value={newMessage}
                onChange={onNewMessageChangeHandler}
              />

          <Button
                type="submit"
                variant="contained"
                sx={{ mb: 2, width: '200px' }}
                >Submit</Button>
            
          </Box>
      </Container>
    </div>
  );
};

export default TicketPage;