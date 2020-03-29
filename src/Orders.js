import React, { useState } from "react";
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

const Order = ({ id, order, onClick }) => {
  const [isLoading, loading] = useState(false);
  return (
    <>
      <ListItem>
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
          {isLoading ? (
            <CircularProgress color="secondary" size={18} />
          ) : (
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={async () => {
                if (
                  window.confirm(
                    "Êtes-vous sûr de vouloir supprimer ce panier  ?"
                  )
                ) {
                  loading(true);
                  try {
                    let data = await (
                      await fetch("/order", {
                        method: "DELETE",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id }),
                      })
                    ).json();
                    onClick(data);
                  } catch (e) {
                    console.error(e);
                  } finally {
                    loading(false);
                  }
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

const Orders = ({ orders, setOrders }) => {
  if (isEmpty(orders)) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <>
      <Typography variant="h3">Liste des commandes</Typography>
      <List dense>
        {orders.map(({ key, order }) => {
          return (
            <Order
              key={key}
              id={key}
              order={order}
              onClick={(orders) => {
                setOrders(orders);
              }}
            />
          );
        })}
      </List>
    </>
  );
};

export default Orders;
