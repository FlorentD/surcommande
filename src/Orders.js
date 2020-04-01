import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Eggs from "./svg/Eggs";
import Fruits from "./svg/Fruits";
import { total } from "./utils";
import isEmpty from "lodash/fp/isEmpty";
import filter from "lodash/fp/filter";
import sortBy from "lodash/fp/sortBy";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

const TransitionStyle = createGlobalStyle`
    .order-enter {
      opacity: 0;
    }
    .order-enter-active {
      opacity: 1;
      transition: opacity 200ms ease-in;
    }
    .order-exit {
      opacity: 1;
    }
    .order-exit-active {
      opacity: 0;
      transition: opacity 200ms ease-in;
    }
`;

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

const getFilteredOrders = (orders, setSearchFilter) => {
  const orderedOrders = sortBy(({ order }) => -order.createdAt)(orders);
  if (isEmpty(filter)) {
    return orderedOrders;
  }
  return filter(
    ({ order }) =>
      `${order.firstName.toLowerCase()} ${order.lastName.toLowerCase()} ${order.email.toLowerCase()}`.indexOf(
        setSearchFilter.toLowerCase()
      ) !== -1
  )(orderedOrders);
};

const Orders = ({ orders, setOrders }) => {
  const [searchFilter, setSearchFilter] = useState("");
  if (isEmpty(orders)) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <>
      <TransitionStyle />
      <Typography variant="h3">Liste des commandes</Typography>
      <Box mt={2} mb={2}>
        <TextField
          id="search-field"
          placeholder="Chercher par nom, prénom, email..."
          fullWidth
          size="medium"
          onChange={(event) => setSearchFilter(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <List dense>
        <TransitionGroup className="order-list">
          {getFilteredOrders(orders, searchFilter).map(({ key, order }) => {
            return (
              <CSSTransition key={key} timeout={200} classNames="order">
                <Order
                  id={key}
                  order={order}
                  onClick={(orders) => {
                    setOrders(orders);
                  }}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </List>
    </>
  );
};

export default Orders;
