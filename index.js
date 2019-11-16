const express = require("express");
const path = require("path");
const parser = require("body-parser");
const app = express();
const QARouter = require("./server/routes");

app.use(parser.json());
app.use("http://18.224.170.190/qa", QARouter);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
