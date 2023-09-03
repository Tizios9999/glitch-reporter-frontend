import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { AppContext } from "../contexts/AppContext";

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
  }, [state, appDispatch, props.filtersArr, props.name]);

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
