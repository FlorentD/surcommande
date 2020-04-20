import ApolloClient, { gql } from "apollo-boost";

export const client = new ApolloClient({
  uri: "https://surcommande.herokuapp.com/v1/graphql",
});

export const ADD_ORDER = gql`
  mutation AddOrder($order: orders_insert_input!) {
    insert_orders(objects: [$order]) {
      returning {
        id
        createdAt
        email
        firstName
        lastName
        withEggs
        cartType
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query {
    orders {
      id
      createdAt
      email
      firstName
      lastName
      withEggs
      cartType
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($uuid: uuid) {
    delete_orders(where: { id: { _eq: $uuid } }) {
      returning {
        id
      }
    }
  }
`;
