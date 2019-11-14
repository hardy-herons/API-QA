const express = require("express");
const path = require("path");
const parser = require("body-parser");
const app = express();
const QARouter = require("./server/routes");

app.use(parser.json());
app.use("/qa", QARouter);
// app.use(express.static(__dirname + "/public/"));

//A catch for all other routes accessed by react-router
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname + "/public/index.html"));
// });

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
