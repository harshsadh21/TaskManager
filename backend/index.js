/* eslint-disable no-undef */
const express = require("express");
const app = express();
const port = 3000;

const db = require("./db");

var cors = require("cors");

app.use(cors());

app.use(express.json());

// available route
app.use("/auth", require("./routes/auth"));
app.use("/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`port is running at http://localhost:${port}`);
});
