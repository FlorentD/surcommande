import React from "react";
import {
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useField } from "formik";

const StyledFormLabel = withStyles({
  root: {
    textAlign: "left",
  },
})(FormControlLabel);

const Error = withStyles(({ palette }) => ({
  root: {
    color: palette.error.main,
  },
}))(FormHelperText);

const Check = ({ name, children }) => {
  const [field, meta] = useField(name);
  return (
    <FormGroup>
      <StyledFormLabel
        control={<Checkbox checked={field.value} {...field} />}
        label={children}
      />
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </FormGroup>
  );
};

Check.propTypes = { name: PropTypes.string.isRequired };

export default Check;
