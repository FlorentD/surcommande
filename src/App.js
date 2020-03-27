import React from "react";
import { Formik } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Préparation des commandes</h1>
          <Formik
            initialValues={{
              email: "test@test.fr",
              firstName: "Mark",
              lastName: "Otto",
            }}
            onSubmit={async (values) => {
              let data = await (
                await fetch("/form", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
              ).json();
              console.log(data);
            }}
          >
            {({ handleSubmit, values, handleChange }) => {
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Control
                      size="lg"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Entrer l'adresse email"
                    />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formFirstName">
                      <Form.Control
                        type="text"
                        size="lg"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        placeholder="Prénom"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                      <Form.Control
                        type="text"
                        size="lg"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        placeholder="Nom"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Button type="submit">Ajouter ce panier</Button>
                </Form>
              );
            }}
          </Formik>
        </Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
  );
};

export default App;
