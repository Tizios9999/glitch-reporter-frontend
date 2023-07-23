import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

export default function CustomSelect(props) {
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
              {capitalize(option.name)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
