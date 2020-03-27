let data = require("@begin/data");

exports.handler = async function http() {
  let orders = await data.get({
    table: "orders",
  });
  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify(orders),
  };
};
