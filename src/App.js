import React from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import TotalOrder from "./TotalOrder";
import Resume from "./Resume";
import Orders from "./Orders";
import { useAuth0 } from "./auth";
import Login from "./Login";
import Signup from "./Signup";
import { ADD_ORDER, GET_ORDERS } from "./api";

const ButtonBox = styled(Box)`
  text-align: center;
  padding: 20px;
`;

const App = () => {
  const [addOrder, { loading }] = useMutation(ADD_ORDER, {
    refetchQueries: [{ query: GET_ORDERS }],
  });
  const { getIdTokenClaims } = useAuth0();
  return (
    <Container>
      <Login />
      <Box mt={10}>
        <Signup />
        <Grid container spacing={8} mt={70}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3">Créer un panier</Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    email: "",
                    firstName: "",
                    lastName: "",
                    cartType: "",
                  }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("Le Prénom est requis"),
                    lastName: Yup.string()
                      .min(2, "Too Short!")
                      .required("Le Nom est requis"),
                    email: Yup.string()
                      .email(`L'email semble invalide`)
                      .required(`L'email est requis`),
                    cartType: Yup.string().required(
                      "N'oubliez pas de sélectionner un panier"
                    ),
                  })}
                  onSubmit={async (values) => {
                    try {
                      const claims = await getIdTokenClaims();
                      console.log(claims.__raw);
                      await addOrder({
                        variables: { order: values },
                        context: {
                          headers: {
                            authorization: `Bearer ${claims.__raw}`,
                          },
                        },
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  {({
                    handleSubmit,
                    values,
                    handleChange,
                    errors,
                    touched,
                  }) => {
                    return (
                      <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              id="firstName"
                              name="firstName"
                              label="Prénom"
                              size="medium"
                              variant="outlined"
                              fullWidth
                              error={touched.firstName && errors.firstName}
                              helperText={errors.firstName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="lastName"
                              name="lastName"
                              label="Nom"
                              size="medium"
                              variant="outlined"
                              fullWidth
                              error={touched.lastName && errors.lastName}
                              helperText={errors.lastName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="email"
                              name="email"
                              type="email"
                              label="Adresse email"
                              size="medium"
                              variant="outlined"
                              fullWidth
                              error={touched.email && errors.email}
                              helperText={errors.email}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <RadioGroup
                              aria-label="panier"
                              name="cartType"
                              onChange={handleChange}
                              row
                            >
                              <Grid container>
                                <Grid item xs={4}>
                                  <FormControlLabel
                                    value="cart15"
                                    control={<Radio />}
                                    label="Panier à 15 €"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControlLabel
                                    value="cart20"
                                    control={<Radio color="secondary" />}
                                    label="Panier à 20 €"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        onChange={handleChange}
                                        name="withEggs"
                                        color="primary"
                                      />
                                    }
                                    label="Avec des oeufs"
                                  />
                                </Grid>
                              </Grid>
                              {errors.cartType && touched.cartType && (
                                <Box mb={2}>
                                  <Alert severity="warning">
                                    {errors.cartType}
                                  </Alert>
                                </Box>
                              )}
                            </RadioGroup>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider light />
                          </Grid>
                          <Grid item xs={12}>
                            <ButtonBox>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                              >
                                {loading ? (
                                  <CircularProgress color="secondary" />
                                ) : (
                                  <Typography>Ajouter ce panier</Typography>
                                )}
                                <TotalOrder
                                  cartType={values.cartType}
                                  withEggs={values.withEggs}
                                />
                              </Button>
                            </ButtonBox>
                          </Grid>
                        </Grid>
                      </form>
                    );
                  }}
                </Formik>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Résumé des commandes</Typography>
              </Grid>
              <Grid item xs={12}>
                <Resume />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Orders />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
