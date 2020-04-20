let arc = require("@architect/functions");
let parseBody = arc.http.helpers.bodyParser;
let axios = require("axios");

exports.handler = async function http(req) {
  let { email, password } = parseBody(req);
  let response = await axios.post(
    "https://surcommande.eu.auth0.com/dbconnections/signup",
    {
      client_id: "IWEa2rRoGxSB3p4lRLfqroJgM83z5GXS",
      email: email,
      password: password,
      connection: "surcommande",
    },
    {
      headers: { "content-type": "application/json" },
      responseType: "json",
    }
  );
  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify(response),
  };
};
