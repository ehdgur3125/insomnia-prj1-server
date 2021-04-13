const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes");
const dotenv = require("dotenv");
const { getId } = require("./controllers/modules");
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsed = cors({
  origin: "http://localhost:8080",
  method: ["GET", "POST", "PATCH", "DELETE", "OPTION"],
  credentials: true,
});

app.use(corsed);
app.use(cookieParser());
app.use(getId);
app.use(router);
app.use((req, res, next) => {
  try {
    next();
  }
  catch (e) {
    console.log(e.name);
    res.status(400).send(e);
  }
})
app.options(corsed);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`server on ${port}`);
});
