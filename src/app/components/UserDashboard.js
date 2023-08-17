"use client";
import * as React from "react";

import { useRouter } from "next/navigation";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

import TicketRowElement from "./TicketRowElement";
import CheckboxFilters from "./CheckboxFilters";

import { getPage, getFilteredPage } from "../services/ticket.service";

import { AppContext } from "../contexts/AppContext";

export default function UserDashboard() {
  const { push } = useRouter();

  const [appState, appDispatch] = React.useContext(AppContext);
  const [ticketsList, setTicketsList] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const customerFilter = [
    { id: 1, name: "Opened by me" },
    { id: 2, name: "Opened by others" },
  ];

  React.useEffect(() => {
    pageRequest(currentPage, appState).then((response) => {
      console.log("tickets: ", response.data);

      setTotalPages(
        Math.ceil(response.data.totalTickets / appState.ticketsPerPage)
      );

      setTicketsList(response.data.ticketList);
    });
  }, [currentPage, appState.activeFilters]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [appState.activeFilters]);

  function handlePageChange(event, value) {
    setCurrentPage(value);
  }

  function pageRequest(page, state) {
    // This function returns all possible filters activated if none of them is.
    function setQueryFilterIds(currentActiveFilters, allFiltersArray) {
      let queryFilter = [];

      if (currentActiveFilters.length === 0) {
        allFiltersArray.forEach((element) => {
          queryFilter.push(element.id);
        });
      } else {
        queryFilter = currentActiveFilters;
      }

      return queryFilter;
    }

    const priorityFilters = setQueryFilterIds(
      state.activeFilters.priority,
      state.metadata.priorities
    );
    const statusFilters = setQueryFilterIds(
      state.activeFilters.status,
      state.metadata.statuses
    );

    return getFilteredPage(
      page,
      state.ticketsPerPage,
      priorityFilters,
      statusFilters
    );
  }

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
            filtersArr={appState.metadata.priorities}
          />
          <CheckboxFilters
            name="status"
            filtersArr={appState.metadata.statuses}
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
          {/* <Box>
            <TicketRow type="header" />
            {ticketData.map((ticket, id) => (
              <TicketRow type="data" key={id} data={ticket} />
            ))}
          </Box> */}
          {ticketsList[0] && (
            <Box>
              <TicketRowElement type="header" />
              {ticketsList.map((ticket, id) => (
                <TicketRowElement type="data" key={id} data={ticket} />
              ))}
            </Box>
          )}
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
            />
          </Container>
        </Box>
      </Container>
    </div>
  );
}
