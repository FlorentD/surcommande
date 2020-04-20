let arc = require("@architect/functions");
let data = require("@begin/data");
let firebase = require("firebase");
require("firebase/firestore");
let table = "orders";

firebase.initializeApp({
  apiKey: "AIzaSyDpjbehFUBmqphCpqkM6vWSumSDOk2-iJU",
  authDomain: "surcommande-56808.firebaseapp.com",
  projectId: "surcommande-56808",
});

let db = firebase.firestore();

let parseBody = arc.http.helpers.bodyParser;

exports.handler = async function http(request) {
  let body = parseBody(request);
  await data.set({ table, order: { ...body, createdAt: Date.now() } });
  const docRef = await db
    .collection(table)
    .add({ ...body, createdAt: Date.now() });
  console.log("Document written with ID: ", docRef.id);
  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify(body),
  };
};
