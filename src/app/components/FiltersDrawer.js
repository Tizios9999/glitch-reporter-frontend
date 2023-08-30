import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import CheckboxFilters from "./CheckboxFilters";
import NewTicketButton from "./NewTicketButton";

import { AppContext } from "../contexts/AppContext";

export default function FiltersDrawer(props) {
  const [appState, appDispatch] = React.useContext(AppContext);

  const handleCloseDrawer = () => {
    props.setOpen(false); // Close the drawer using the setOpen function
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 220,
        zIndex: "-200",
        marginTop: "80px", // Adjust this value as needed to avoid overlapping with the navbar
      }}
      role="presentation"
    >
      <Box textAlign="center">
        <NewTicketButton type="standard" />
      </Box>
      <CheckboxFilters
        name="priority"
        filtersArr={appState.metadata.priorities}
      />
      <Divider />
      <CheckboxFilters name="status" filtersArr={appState.metadata.statuses} />
      <Divider />
      {props.size === "mobileSize" && (
        <Box textAlign="center">
          <Button variant="contained" onClick={handleCloseDrawer}>
            Close
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={props.open}
            onClose={handleCloseDrawer}
            variant={props.size === "mobileSize" ? "temporary" : "permanent"}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
