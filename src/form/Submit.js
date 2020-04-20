import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { useFormikContext } from "formik";

const Submit = ({ children }) => {
  const { submitForm } = useFormikContext();
  return (
    <Box m={5}>
      <Button fullWidth size="large" variant="contained" onClick={submitForm}>
        <Box m={2}>{children}</Box>
      </Button>
    </Box>
  );
};

Submit.propTypes = {};

export default Submit;
