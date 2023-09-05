/* IMPORTS */
// React
// Next.js
// External services
// Internal services
// Components
// Internal functions
import capitalizeString from "../common/js/capitalizeString";
// Contexts
// Material UI Components
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

/*
+-----------------------+
| COMPONENT DESCRIPTION |   
+-----------------------+

This is a Select with custom properties.

*/

export default function CustomSelect(props) {
  return (
    <FormControl size="medium" sx={{ textAlign: "center", width: props.width }}>
      <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.name}-label`}
        id={`${props.name}`}
        value={props.currentValue}
        label={props.label}
        name={props.name}
        onChange={props.onChange}
        required={props.required}
      >
        {props.values.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {capitalizeString(option.name)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
