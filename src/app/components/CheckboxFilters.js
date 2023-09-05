/* IMPORTS */
// React
import * as React from "react";
// Next.js
// External services
// Internal services
// Components
// Internal functions
// Contexts
import { AppContext } from "../contexts/AppContext";
// Material UI Components
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

This filter group takes an array of filters and renders a Checkbox group.
Any filter will then update the activeFilters in the appState context.

Parameters:
- filtersArr: an array with all the filters objects with id and name
- name: the name of the filter that will be shown on the Checkbox group
and will be used to update the active filters context.


*/

export default function CheckboxFilters(props) {
  const [appState, appDispatch] = React.useContext(AppContext);

  const startingState = {};
  props.filtersArr.forEach((obj) => {
    startingState[obj.name] = appState.activeFilters[props.name].includes(
      obj.name
    );
  });

  const [state, setState] = React.useState(startingState);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // updating the activeFilters on AppState context
  React.useEffect(() => {
    const checkboxArr = Object.keys(state).filter((key) => state[key]);

    const idArr = checkboxArr.map((name) =>
      mapFilterNameToId(name, props.filtersArr)
    );

    appDispatch({
      type: "UPDATE_FILTERS",
      payload: { name: props.name, values: [...idArr] },
    });
  }, [state]);

  function mapFilterNameToId(name, filterObj) {
    const found = filterObj.find((element) => element.name === name);

    return found.id.toString();
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        maxWidth: "165px",
        marginTop: "10px",
        borderRadius: "12px",
      }}
    >
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
      </FormControl>
    </Box>
  );
}
