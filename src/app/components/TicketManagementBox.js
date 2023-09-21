/* IMPORTS */
// React
import { useState } from "react";
// Next.js
// External services
// Internal services
import { updateTicketStatus, addMessage } from "../services/ticket.service";
// Components
// Internal functions
import capitalizeString from "../common/js/capitalizeString";
import getCurrentDateTimeISO from "../common/js/getCurrentDateTimeISO";
// Contexts
// Material UI Components
import { Box, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

Box used to update a ticket status.

The authorized user (Agent or Admin) can:
- Take charge of the ticket
- Modify the ticket status to a different one (in progress, solved etc)

*/

function TicketManagementBox({ user, ticket, statuses }) {
  const allowedUserRoles = ["ROLE_ADMIN", "ROLE_AGENT"];

  const alreadyManagedByThisAgent = ticket.assignedToId == user.id;

  const [newAssignedUserId, setNewAssignedUserId] = useState(
    ticket.assignedToId
  );

  const [ticketStatusValue, setTicketStatusValue] = useState(ticket.statusId);

  let ticketManagementUserText = "";
  let statusMessageText = "";

  function handleAssignmentButtonClick() {
    if (!alreadyManagedByThisAgent) {
      if (newAssignedUserId != user.id) {
        setNewAssignedUserId(user.id);
        ticketManagementUserText = generateAgentText(user.username);
      } else {
        setNewAssignedUserId(ticket.assignedToId);
        ticketManagementUserText = "";
      }
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
    let statusChanged =
      ticket.statusId === Number(ticketStatusValue) ? false : true;
    let assignedUserChanged =
      Number(newAssignedUserId) === Number(ticket.assignedToId) ? false : true;

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

        ticketManagementUserText =
          assignedUserChanged || ticket.assignedToId === 0
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

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        appDispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
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
            variant={newAssignedUserId == user.id ? "outlined" : "contained"}
            color="warning"
            onClick={handleAssignmentButtonClick}
          >
            {newAssignedUserId == user.id ? "Assigned to me" : "Assign to me"}
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
