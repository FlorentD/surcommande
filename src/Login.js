import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useAuth0 } from "./auth";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <AppBar position="fixed">
      <StyledToolbar>
        <Typography variant="h6">Surcommande</Typography>
        <Box>
          {!isAuthenticated && (
            <Button variant="contained" onClick={() => loginWithRedirect({})}>
              Se connecter
            </Button>
          )}
          {isAuthenticated && (
            <Button variant="contained" onClick={() => logout()}>
              Se déconnecter
            </Button>
          )}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Login;
