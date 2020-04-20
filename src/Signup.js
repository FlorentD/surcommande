import React from "react";
import TextField from "@material-ui/core/TextField";
import { Formik, Field } from "formik";
import Button from "@material-ui/core/Button";

const Signup = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        let result = await (
          await fetch("/signup", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
        ).json();
        console.log(result);
      }}
    >
      {({ values, handleSubmit }) => {
        return (
          <>
            <Field name="email">
              {({ field }) => (
                <TextField
                  label="email"
                  placeholder="mon@email.fr"
                  size="medium"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <TextField
                  label="mot de passe"
                  type="password"
                  size="medium"
                  variant="outlined"
                  {...field}
                />
              )}
            </Field>
            <Button onClick={handleSubmit}>S'inscrire</Button>
          </>
        );
      }}
    </Formik>
  );
};

export default Signup;
