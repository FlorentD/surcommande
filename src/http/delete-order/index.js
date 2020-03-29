let arc = require("@architect/functions");
let data = require("@begin/data");
let table = "orders";
let parseBody = arc.http.helpers.bodyParser;

exports.handler = async function http(request) {
  let body = parseBody(request);
  await data.destroy({ table, key: body.id });
  let orders = await data.get({ table });
  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify(orders),
  };
};
