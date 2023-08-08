"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";

import TicketManagementBox from "@/app/components/TicketManagementBox";

import { getTicketById } from "@/app/services/ticket.service";

import { AppContext } from "../../contexts/AppContext";

import { AuthContext } from "@/app/contexts/AuthContext";

import {
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

import getMetadataObject from "../../js/getMetadataObject";
import convertISOStringToLocalFormat from "@/app/js/convertISOStringToLocalFormat";

import TicketMessage from "../../components/TicketMessage";
import FileUpload from "../../components/FileUpload";

const TicketPage = () => {
  const [id, setId] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [priorityObj, setPriorityObj] = useState(null);
  const [statusObj, setStatusObj] = useState(null);
  const pathname = usePathname();

  const [appState] = useContext(AppContext);
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    const fetchId = async () => {
      const pathnameArr = await pathname.split("/");
      const extractedId = pathnameArr[2];
      setId(extractedId);
    };

    fetchId();

    console.log("fetching id");
  }, [pathname]);

  // Utilizza l'ID del ticket per recuperare i dati relativi a quel ticket
  useEffect(() => {
    // const getTicketById = () => {
    //   const ticket = ticketsData.find((ticket) => ticket.ticketId === id);
    //   setTicket(ticket);
    // };

    console.log("getting ticket id");

    if (id) {
      getTicketById(id).then((response) => {
        console.log("ticket arrived: ", response);

        setTicket(response.data);
      });
    }
  }, [id]);

  // Utilizza l'ID del ticket per recuperare i dati relativi a quel ticket
  useEffect(() => {
    if (ticket) {
      const priority = getMetadataObject(
        "priorities",
        ticket.priorityId,
        appState.metadata
      );

      setPriorityObj(priority);
    }
    if (ticket) {
      const status = getMetadataObject(
        "statuses",
        ticket.statusId,
        appState.metadata
      );

      setStatusObj(status);
    }
  }, [ticket]);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Loading ticket data...</div>;
  }

  if (!priorityObj || !statusObj) {
    return <div>Loading ticket metadata...</div>;
  }

  function onNewMessageChangeHandler(event) {
    setNewMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Message submitted: ", newMessage);

    {
      /* Make use of firebase to handle files uploaded */
    }
  }

  return (
    <div>
      <CssBaseline />
      <Container size="xl">
        <h1>
          #{id} - {ticket.ticketSubject}
        </h1>
        {/* Mostra i dettagli del ticket */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body1" color="initial">
              <strong>Opened by:</strong> {ticket.openingUser}
            </Typography>
            <Typography variant="body1" color="initial">
              <strong>Priority:</strong>{" "}
              <span
                style={
                  priorityObj
                    ? {
                        color: `#${priorityObj.textColorCode}`,
                        backgroundColor: `#${priorityObj.bgColorCode}`,
                        padding: "3px",
                      }
                    : {}
                }
              >
                {priorityObj.name}
              </span>
            </Typography>
            <Typography variant="body1" color="initial">
              <strong>Status:</strong>{" "}
              <span
                style={
                  statusObj
                    ? {
                        color: `#${statusObj.textColorCode}`,
                        backgroundColor: `#${statusObj.bgColorCode}`,
                        padding: "3px",
                      }
                    : {}
                }
              >
                {statusObj.name}
              </span>
            </Typography>
            <Typography variant="body1" color="initial">
              <strong>Assigned to:</strong> {ticket.assignedTo}
            </Typography>
            <Typography variant="body1" color="initial">
              <strong>Created:</strong>{" "}
              {convertISOStringToLocalFormat(ticket.creationDate)}
            </Typography>
            <Typography variant="body1" color="initial">
              <strong>Last updated:</strong>{" "}
              {convertISOStringToLocalFormat(ticket.lastUpdated)}
            </Typography>
          </Box>
          <TicketManagementBox
            user={authState.user}
            ticket={ticket}
            statuses={appState.metadata.statuses}
          />
        </Box>
        <Box sx={{ mt: "50px", border: "1px solid black" }}>
          {ticket.messages.map((message, key) => {
            return <TicketMessage messageData={message} key={key} />;
          })}
        </Box>

        {console.log(ticket, "ticket")}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            gap: "30px",
          }}
        >
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

          <FileUpload />

          <Button
            type="submit"
            variant="contained"
            sx={{ mb: 2, width: "200px" }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default TicketPage;
