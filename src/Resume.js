import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import size from "lodash/fp/size";
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";
import isEmpty from "lodash/fp/isEmpty";
import { total } from "./utils";

const getTotal = (orders) => {
  return reduce((sum, { order }) => {
    return sum + total(!isEmpty(order.withEggs), order.cartType);
  }, 0)(orders);
};

const getEggsSize = (orders) => {
  return flow(
    map(({ order }) => order),
    filter(({ withEggs }) => withEggs),
    size
  )(orders);
};

const getSizeForType = (orders, cartType) => {
  return flow(
    map(({ order }) => order),
    filter({ cartType }),
    size
  )(orders);
};

const Resume = ({ orders }) => {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell>
            <Box fontWeight="fontWeightMedium" fontSize={18}>
              Nombre de commandes
            </Box>
          </TableCell>
          <TableCell>
            <Box fontWeight="fontWeightMedium" fontSize={18}>
              {size(orders)}
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Box ml={4}>Commandes à 20 €</Box>
          </TableCell>
          <TableCell>{getSizeForType(orders, "cart20")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Box ml={4}>Commandes à 15 €</Box>
          </TableCell>
          <TableCell>{getSizeForType(orders, "cart15")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Box fontWeight="fontWeightMedium" fontSize={18}>
              Boîtes d'oeufs
            </Box>
          </TableCell>
          <TableCell>
            <Box fontWeight="fontWeightMedium" fontSize={18}>
              {getEggsSize(orders)}
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Box fontSize={26} fontWeight="fontWeightBold">
              Total des commandes
            </Box>
          </TableCell>
          <TableCell>
            <Box fontSize={26} fontWeight="fontWeightBold">
              {getTotal(orders)} €
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Resume;
