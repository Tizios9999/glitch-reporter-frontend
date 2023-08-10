import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { updateTicketStatus } from "../services/ticket.service";

import capitalizeString from "../js/capitalizeString";

function TicketManagementBox({ user, ticket, statuses }) {
  const allowedUserRoles = ["ROLE_ADMIN", "ROLE_AGENT"];

  const [managedByThisAgent, setManagedByThisAgent] = useState(
    ticket.assignedToId === user.id
  );

  const [newAssignedUserId, setNewAssignedUserId] = useState(
    ticket.assignedToId
  );

  const [ticketStatusValue, setTicketStatusValue] = useState(ticket.statusId);

  function handleAssignmentButtonClick() {
    if (!managedByThisAgent) {
      setManagedByThisAgent(true);
      setNewAssignedUserId(user.id);
    } else {
      setManagedByThisAgent(false);
      setNewAssignedUserId(ticket.assignedToId);
    }
  }

  function handleStatusChange(event) {
    setTicketStatusValue(event.target.value);
  }

  function handleUpdateButtonClick() {
    console.log("Update ticket: ", ticketStatusValue, newAssignedUserId);

    /* If the ticket is still unassigned during the update, 
       it will be assigned automatically to whoever updates it first. */
    const updateData = {
      ticketStatusId: Number(ticketStatusValue),
      newAssignedUserId: newAssignedUserId == 0 ? user.id : newAssignedUserId,
    };

    updateTicketStatus(updateData, ticket.ticketId);
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
