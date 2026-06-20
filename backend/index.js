require("dotenv").config();
const authMiddleware = require("./middleware/authmiddleware");
const authRoutes =
require("./Routes/authRoutes");
const holdingsRoutes =
  require("./Routes/HoldingRoutes");

 const ordersRoutes =
  require("./Routes/ordersRoutes");
  const fundsRoutes =
  require("./Routes/FundsRoutes");

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");

const { OrdersModel } = require("./model/OrdersModel");
const bodyParser = require("body-parser");


const { UsersModel } = require("./model/UsersModel");

const app = express();
const session = require("express-session");

const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(holdingsRoutes);
app.use(ordersRoutes);
app.use(fundsRoutes);


const sessionOptions = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:");
    console.log(err);
  });




















