/* eslint-disable no-undef */

const jwt = require("jsonwebtoken");
const JWT_SECRET = "harshisgood";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded.user);
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
