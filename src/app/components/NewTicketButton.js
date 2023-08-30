import * as React from "react";

import { useRouter } from "next/navigation";

import { Fab, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";

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
