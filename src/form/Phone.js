import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { TextField, Box, makeStyles } from "@material-ui/core";
import MaskedInput from "react-text-mask";

const PhoneInput = ({ inputRef, ...other }) => (
  <MaskedInput
    {...other}
    ref={(ref) => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
      " ",
      /\d/,
      /\d/,
    ]}
  />
);

const useCustomStyle = makeStyles(() => ({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderColor: "green",
    },
  },
}));

const Phone = ({ name, placeholder, ...props }) => {
  const [field, meta] = useField(name);
  const classes = useCustomStyle();
  return (
    <Box m={1} fontFamily="Signika">
      <TextField
        label={placeholder}
        InputProps={{ classes, inputComponent: PhoneInput }}
        type="phone"
        variant="outlined"
        fullWidth
        error={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
    </Box>
  );
};

Phone.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Phone;
