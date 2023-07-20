"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

import { AppContext } from "../contexts/AppContext";

export default function CheckboxFilters(props) {
  // I will take the possible choices and make an object out of it to set the initial state
  const initialState = props.filters.reduce((acc, value) => {
    acc[value] = false;
    return acc;
  }, {});

  const [appState, appDispatch, loadMetadata] = React.useContext(AppContext);

  const [state, setState] = React.useState(initialState);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  // updating the activeFilters on AppState context
  React.useEffect(() => {
    const checkboxArr = Object.keys(state).filter((key) => state[key]);

    console.log("checkboxArr", props.name, checkboxArr);

    appDispatch({
      type: "UPDATE_FILTERS",
      payload: { name: props.name, values: [...checkboxArr] },
    });
  }, [state]);

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </FormLabel>
        <FormGroup>
          {Object.entries(state).map(([key, value]) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={handleChange}
                    name={key}
                    key={key}
                  />
                }
                label={key}
                key={key}
              />
            );
          })}
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    </Box>
  );
}
