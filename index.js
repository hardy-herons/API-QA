const express = require("express");
const path = require("path");
const parser = require("body-parser");
const app = express();
const QARouter = require("./server/routes");

app.use(parser.json());
app.use("/qa", QARouter);

let port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
