import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Eggs from "./svg/Eggs";
import Fruits from "./svg/Fruits";
import { total } from "./utils";

const Total = styled(ListItemText)`
  text-align: right;
`;

const Orders = ({ orders }) => {
  return (
    <>
      <Typography variant="h3">Liste des commandes</Typography>
      <List>
        {orders.map(({ key, order }) => {
          return (
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
                  style: { fontSize: 22, fontWeight: "bold" },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Orders;
