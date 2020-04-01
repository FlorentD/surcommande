import React, { useState, useEffect } from "react";
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
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import TotalOrder from "./TotalOrder";
import Resume from "./Resume";
import Orders from "./Orders";

const ButtonBox = styled(Box)`
  text-align: center;
  padding: 20px;
`;

const App = () => {
  const [orders, setOrders] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  let fetchData = async () => {
    try {
      let data = await (await fetch("/orders")).json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Grid container spacing={8}>
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
                  setAddLoading(true);
                  try {
                    await (
                      await fetch("/form", {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      })
                    ).json();
                    await fetchData();
                  } catch (e) {
                    console.error(e);
                  } finally {
                    setAddLoading(false);
                  }
                }}
              >
                {({ handleSubmit, values, handleChange, errors, touched }) => {
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
                              startIcon={<ShoppingCartIcon />}
                            >
                              {addLoading ? (
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
              <Resume orders={orders} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Orders orders={orders} setOrders={setOrders} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
