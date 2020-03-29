import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import Eggs from "./svg/Eggs";
import Fruits from "./svg/Fruits";
import { total } from "./utils";
import isEmpty from "lodash/fp/isEmpty";
import CircularProgress from "@material-ui/core/CircularProgress";

const Total = styled(ListItemText)`
  text-align: right;
`;

const Orders = ({ orders }) => {
  if (isEmpty(orders)) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <>
      <Typography variant="h3">Liste des commandes</Typography>
      <List dense>
        {orders.map(({ key, order }) => {
          return (
            <>
              <ListItem key={key}>
                <ListItemIcon>
                  <Fruits />
                </ListItemIcon>
                {order.withEggs && (
                  <ListItemIcon>
                    <Eggs />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={`${order.firstName} ${order.lastName}`}
                  secondary={order.email}
                />
                <Total
                  primary={`${total(order.withEggs, order.cartType)} €`}
                  primaryTypographyProps={{
                    style: {
                      fontSize: 22,
                      fontWeight: "bold",
                      marginRight: 10,
                    },
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={console.log}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </>
  );
};

export default Orders;
