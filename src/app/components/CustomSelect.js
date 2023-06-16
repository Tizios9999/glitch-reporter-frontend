import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

export default function CustomSelect(props) {

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      

    return (
        <FormControl sx={{ textAlign: "center"}}>
          <InputLabel id={`${props.name}-label`}>{capitalize(props.name)}</InputLabel>
          <Select
            labelId={`${props.name}-label`}
            id={`${props.name}`}
            value={props.currentValue}
            label={capitalize(props.name)}
            name={props.name}
            onChange={props.onChange}
          >

            {props.values.map((value, index) => {
                return <MenuItem key={index} value={value}>{capitalize(value)}</MenuItem>
            })}
            
          </Select>
  </FormControl>
    ) 
}