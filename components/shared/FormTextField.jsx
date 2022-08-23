import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormTextField = (props) => (
  <Controller
    name={props.name}
    control={props.control}
    defaultValue=""
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        label={error ? error.message : props.label}
        variant="outlined"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={props.helperText ? props.helperText : null}
        sx={props.style}
        className={props.addedClassName}
        margin="none"
      />
    )}
    rules={{ required: "Missing " + props.label, ...props.rules }}
  />
);

export default FormTextField;
