"use client";
import * as React from "react";

import { useRouter } from "next/navigation";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Fab from "@mui/material/Fab";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

import TicketRowElement from "./TicketRowElement";
import TicketCardElement from "./TicketCardElement";
import CheckboxFilters from "./CheckboxFilters";
import FiltersDrawer from "./FiltersDrawer";
import NewTicketButton from "./NewTicketButton";

import { getFilteredPage } from "../services/ticket.service";

import { AppContext } from "../contexts/AppContext";

import compactMediaQuery from "../rendering/compactMediaQuery";

export default function UserDashboard() {
  const { push } = useRouter();

  const [appState, appDispatch] = React.useContext(AppContext);
  const [ticketsList, setTicketsList] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const size = compactMediaQuery();

  const ticketHeaders = [
    {
      fieldName: "ID",
      type: "id",
    },
    {
      fieldName: "Customer",
      type: "normal",
    },
    {
      fieldName: "Subject",
      type: "normal",
    },
    {
      fieldName: "Priority",
      type: "normal",
    },
    {
      fieldName: "Assigned to",
      type: "normal",
    },
    {
      fieldName: "Last Updated",
      type: "normal",
    },
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

  function countActiveFilters(filters) {
    // Calcola il conteggio totale degli elementi in tutti gli array
    const totalCount = Object.values(filters).reduce((acc, array) => {
      return acc + array.length;
    }, 0);

    console.log(totalCount);

    return totalCount;
  }

  return (
    <div>
      <CssBaseline />
      {console.log("Size: ", compactMediaQuery())}
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
          {size === "mobileSize" && <NewTicketButton type="icon" />}

          {size === "mobileSize" && (
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={countActiveFilters(appState.activeFilters)}
              sx={{
                position: "fixed",
                bottom: "128px",
                right: "20px",
                zIndex: "2",
              }}
            >
              <Fab
                sx={{
                  position: "fixed",
                  bottom: "80px",
                  right: "16px",
                  zIndex: "1",
                }}
                color="info"
                aria-label="filter"
                onClick={() => setDrawerOpen(true)}
              >
                <FilterAltIcon />
              </Fab>
            </Badge>
          )}

          <FiltersDrawer
            open={drawerOpen}
            setOpen={setDrawerOpen}
            size={size}
          />
        </Box>

        <Box
          sx={{
            gridArea: "main",
            width: "100%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
          }}
        >
          {size === "desktopSize"
            ? ticketsList[0] && (
                <Box>
                  <TicketRowElement type="header" headers={ticketHeaders} />
                  {ticketsList.map((ticket, id) => (
                    <TicketRowElement type="data" key={id} data={ticket} />
                  ))}
                </Box>
              )
            : ticketsList[0] && (
                <Box
                  sx={{
                    display: "flex",
                    flexFlow: "column wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {ticketsList.map((ticket, id) => (
                    <TicketCardElement
                      headers={ticketHeaders}
                      data={ticket}
                      key={id}
                    />
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
