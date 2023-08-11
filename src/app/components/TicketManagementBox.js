import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Box, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { updateTicketStatus, addMessage } from "../services/ticket.service";
import getCurrentDateTimeISO from "../js/getCurrentDateTimeISO";

import capitalizeString from "../js/capitalizeString";

function TicketManagementBox({ user, ticket, statuses }) {
  const router = useRouter();

  const allowedUserRoles = ["ROLE_ADMIN", "ROLE_AGENT"];

  const [managedByThisAgent, setManagedByThisAgent] = useState(
    ticket.assignedToId === user.id
  );

  const [newAssignedUserId, setNewAssignedUserId] = useState(
    ticket.assignedToId
  );

  const [ticketStatusValue, setTicketStatusValue] = useState(ticket.statusId);

  let ticketManagementUserText = "";
  let statusMessageText = "";

  function handleAssignmentButtonClick() {
    if (!managedByThisAgent) {
      setManagedByThisAgent(true);
      setNewAssignedUserId(user.id);
      ticketManagementUserText = generateAgentText(user.username);
    } else {
      setManagedByThisAgent(false);
      setNewAssignedUserId(ticket.assignedToId);
      ticketManagementUserText = "";
    }
  }

  function handleStatusChange(event) {
    setTicketStatusValue(event.target.value);

    statusMessageText = generateStatusText(
      user.username,
      ticketStatusValue,
      statuses
    );
  }

  async function handleUpdateButtonClick() {
    console.log("Update ticket: ", ticketStatusValue, newAssignedUserId);

    let statusChanged =
      ticket.statusId === Number(ticketStatusValue) ? false : true;
    let assignedUserChanged =
      Number(newAssignedUserId) === Number(ticket.assignedToId) ? false : true;

    console.log(statusChanged, assignedUserChanged);
    console.log("Assigned user id", newAssignedUserId);
    console.log("ticket id", ticket.assignedToId);

    if (statusChanged || assignedUserChanged || ticket.assignedToId === 0) {
      /* If the ticket is still unassigned during the update, 
       it will be assigned automatically to whoever updates it first. */
      const updateData = {
        ticketStatusId: Number(ticketStatusValue),
        newAssignedUserId:
          ticket.assignedToId === 0 ? user.id : newAssignedUserId,
      };

      try {
        await updateTicketStatus(updateData, ticket.ticketId);

        const currentDateTimeISO = getCurrentDateTimeISO();

        statusMessageText = statusChanged
          ? generateStatusText(user.username, ticketStatusValue, statuses)
          : "";

        ticketManagementUserText = assignedUserChanged
          ? generateAgentText(user.username)
          : "";

        const automatedMessageText = `Automated message: ${ticketManagementUserText} ${statusMessageText}`;

        const automatedMessage = {
          ticketId: ticket.ticketId,
          senderId: user.id,
          sender: user.username,
          message: automatedMessageText,
          messageDate: currentDateTimeISO,
          uploadedFiles: [],
        };

        await addMessage(automatedMessage, ticket.ticketId);

        // Reload the page
        location.reload();
      } catch (error) {
        console.error("Error during update and message addition: ", error);
        // Handle the error
      }
    }
  }

  function generateAgentText(username) {
    return `Agent ${username} now is assigned to this ticket.`;
  }

  function generateStatusText(username, statusValue, statuses) {
    const currentStatus = statuses.filter((status) => status.id == statusValue);

    return `Agent ${username} has updated the ticket status to <${currentStatus[0].name}>.`;
  }

  return (
    <Box>
      {user.roles.some((role) => allowedUserRoles.includes(role)) && (
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            textAlign: "center",
            gap: "7px",
            border: "1px dashed black",
            padding: "20px",
          }}
        >
          <Typography variant="h5" color="initial">
            Ticket Management
          </Typography>
          <Button
            variant={managedByThisAgent ? "outlined" : "contained"}
            color="warning"
            onClick={handleAssignmentButtonClick}
          >
            {managedByThisAgent ? "Assigned to me" : "Assign to me"}
          </Button>
          <Typography variant="bold" color="initial"></Typography>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <strong>Set ticket status</strong>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={ticketStatusValue}
              name="radio-buttons-group"
              onChange={handleStatusChange}
            >
              {statuses.map((status) => {
                return (
                  <FormControlLabel
                    value={status.id}
                    control={<Radio />}
                    label={capitalizeString(status.name)}
                    key={status.id}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateButtonClick}
          >
            Update Ticket
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default TicketManagementBox;
