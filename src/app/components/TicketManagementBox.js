import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import capitalizeString from "../js/capitalizeString";

function TicketManagementBox({ user, ticket, statuses }) {
  const allowedUserRoles = ["ROLE_ADMIN", "ROLE_AGENT"];

  const managedByThisAgent = ticket.assignedToId === user.id;

  function handleAssignmentButtonClick() {}

  function handleUpdateButtonClick() {}

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
              defaultValue={statuses[0].id}
              name="radio-buttons-group"
            >
              {statuses.map((status) => {
                return (
                  <FormControlLabel
                    value={status.id}
                    control={<Radio />}
                    label={capitalizeString(status.name)}
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
