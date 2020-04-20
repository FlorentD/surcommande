import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { TextField, Box, makeStyles } from "@material-ui/core";

const useCustomStyle = makeStyles(() => ({
  root: {
    "& input + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:focus + fieldset": {
      borderColor: "green",
    },
  },
}));

const Text = ({ name, type, placeholder, ...props }) => {
  const [field, meta] = useField(name);
  const classes = useCustomStyle();
  return (
    <Box m={1} fontFamily="Signika">
      <TextField
        label={placeholder}
        InputProps={{ classes }}
        type={type}
        variant="outlined"
        fullWidth
        error={meta.touched && !!meta.error}
        {...field}
        {...props}
      />
    </Box>
  );
};

Text.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Text.defaultProps = {
  type: "text",
};

export default Text;
