import React from "react";
import { Formik } from "formik";
import styled, { createGlobalStyle } from "styled-components";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { Text, Submit, Phone, Check } from "./form";
import Logo from "./svg/Logo";
import * as Yup from "yup";

const GlobalStyle = createGlobalStyle`
body{
    background-color: skyblue;
}
`;

const StyledLogo = styled(Logo)`
  width: 70%;
`;

const SigninSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  accept: Yup.bool().test(
    "is-checked",
    "Vous devez accepter les termes",
    (value) => value
  ),
});

const Landing = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={6}>
            <Box mt={10} align="center">
              <StyledLogo />
            </Box>
            <Typography align="center" variant="h1">
              Chez François
            </Typography>
            <Typography align="center" variant="h4">
              producteur du Pellerin
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Box mt={10} align="center">
              <Card>
                <CardContent>
                  <Typography align="center" variant="h4">
                    <Box mb={3}>Distribution du mardi 14 mai</Box>
                  </Typography>
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      accept: false,
                    }}
                    validationSchema={SigninSchema}
                    onSubmit={console.log}
                  >
                    {({ values }) => {
                      console.log(values);
                      return (
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Text
                              name="firstName"
                              required
                              placeholder="Prénom"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Text
                              name="lastName"
                              required
                              placeholder="Nom de famille"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Text
                              name="email"
                              type="email"
                              required
                              placeholder="Votre email"
                              helperText="Pour vous envoyez les informations de la livraison"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Phone
                              name="phone"
                              placeholder="Téléphone"
                              helperText="Pour vous contacter en cas de souci"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Check name="accept">
                              Je m'engage à payer et retirer la commande afin
                              d'assurer le bon fonctionnement de celles-ci.
                            </Check>
                          </Grid>
                          <Grid item xs={12}>
                            <Submit>Se connecter</Submit>
                          </Grid>
                        </Grid>
                      );
                    }}
                  </Formik>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
