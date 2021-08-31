const express = require("express");

const app = express();

const http = require("http");

const server = http.createServer(app);

const port = proccess.env.PORT || 3000;

app.set("port", port);

server.listen(3000, "172.20.10.4" || "localhost", function () {
  console.log("Aplication de nodejs " + proccess.pid + "iniciada");
});
