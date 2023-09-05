/* IMPORTS */
// React
import * as React from "react";
// Next.js
import { useRouter } from "next/navigation";
// External services
// Internal services
// Components
// Internal functions
// Contexts
// Material UI Components
import { Fab, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

New ticket button component. Comes in two sizes (types):

- standard: for medium to large sized screen
- icon: for smaller screens

*/

export default function NewTicketButton({ type }) {
  const { push } = useRouter();

  if (type === "standard") {
    return (
      <Button
        variant="contained"
        disableElevation
        color="success"
        size="large"
        endIcon={<AddCircleIcon />}
        onClick={() => {
          push("./newticket");
        }}
      >
        New ticket
      </Button>
    );
  } else if (type === "icon") {
    return (
      <Fab
        sx={{ position: "fixed", bottom: "16px", right: "16px" }}
        color="success"
        aria-label="New ticket"
        onClick={() => {
          push("./newticket");
        }}
      >
        <AddIcon />
      </Fab>
    );
  }
}
