const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const logger = require("morgan");

const port = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.disable("x-powered-by");

app.set("port", port);

server.listen(3000, "localhost", function () {
  console.log("Aplication de nodejs " + process.pid + " iniciada");
});

app.get("", (req, res, next) => {
  res.send("Flutter Delivery");
});

// error Handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});
