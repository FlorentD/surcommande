import React from "react";
import Box from "@material-ui/core/Box";
import { total } from "./utils";

const TotalOrder = ({ withEggs, cartType }) => {
  return (
    <Box as="span" m={1}>
      (Total {total(withEggs, cartType)} €)
    </Box>
  );
};

export default TotalOrder;
