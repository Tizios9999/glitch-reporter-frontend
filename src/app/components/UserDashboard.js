"use client";
import * as React from "react";

import { useRouter } from "next/navigation";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

import TicketRow from "./TicketRow";
import CheckboxFilters from "./CheckboxFilters";

import tickets from "../testdata/tickets";
import priority from "../testdata/priority";
import status from "../testdata/status";

import { getPage } from "../services/ticket.service";

import { AppContext } from "../contexts/AppContext";

export default function UserDashboard() {
  const { push } = useRouter();

  const ticketData = Array.from(tickets);

  const [appState, appDispatch] = React.useContext(AppContext);

  const customerFilter = [
    { id: 1, name: "Opened by me" },
    { id: 2, name: "Opened by others" },
  ];

  React.useEffect(() => {
    getPage(1, 15).then((response) => {
      console.log("tickets: ", response.data);
    });
  }, []);

  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          borderRadius: "5px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "auto",
          gridTemplateAreas: `"sidebar main main main main"`,
        }}
      >
        <Box
          sx={{
            gridArea: "sidebar",
          }}
        >
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

          <CheckboxFilters
            name="priority"
            filters={priority}
            filtersArr={appState.metadata.priorities}
          />
          <CheckboxFilters
            name="status"
            filters={status}
            filtersArr={appState.metadata.statuses}
          />
          <CheckboxFilters
            name="customer"
            filters={["opened by me", "opened by others"]}
            filtersArr={customerFilter}
          />
        </Box>
        <Box
          sx={{
            gridArea: "main",
            width: "100%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <TicketRow type="header" />
            {ticketData.map((ticket, id) => (
              <TicketRow type="data" key={id} data={ticket} />
            ))}
          </Box>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <Pagination count={10} color="secondary" />
          </Container>
        </Box>
      </Container>
    </div>
  );
}
