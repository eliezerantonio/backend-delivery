const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const logger = require("morgan");
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey");
const passport = require("passport");

/*
inicializar fireabse admin
*/
admin.initializeApp({ credentials: admin.credential.cert(serviceAccount) });

const upload = multer({ storage: multer.memoryStorage() });

const port = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.disable("x-powered-by");
/*
Rotas
*/

const users = require("./routes/usersRoutes");
const categories = require("./routes/categoriesRoutes");
const products = require("./routes/productsRoutes");
app.set("port", port);

//chamando rotas
users(app, upload);
categories(app);
products(app, upload);

server.listen(3000, "192.168.81.3" || "localhost", function () {
  console.log("Aplication de nodejs " + process.pid + " iniciada");
});

// error Handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,
  server: server,
};
//source pgadmin4/bin/activate
