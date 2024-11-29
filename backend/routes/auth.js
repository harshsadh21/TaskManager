/* eslint-disable no-undef */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "harshisgood";

// Route1 :create a user using : post "/auth".
router.post(
  "/createuser",

  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "it should at least have 5 character").isLength({
      min: 5,
    }),
    body("name", "name is not valid").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //   res.send("auth working ");

    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let { email, name, password } = req.body;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "user already exists with that email" });
      }
      // const salt = await bcrypt.genSalt(10);
      // let secPassword = req.body.passwrod;

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            res.send("somrthing went wrong");
          }
          // Store hash in your password DB.

          user = await User.create({
            name: name,
            password: hash,
            email: email,
          });

          let token = jwt.sign({ user: user._id }, JWT_SECRET);
          success = true;
          // console.log(token);
          res.send({ success, token });
          // res.send("user created");
        });
      });
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err.message);
      // });
    } catch (error) {
      console.log(error.message);
    }
  }
);

/// Route2:  login to the user using the registered details
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password should not be blank").exists(),
  ],
  async (req, res) => {
    /// if there are error send error of bad request
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      res.status(400).json({ success, errors: errors.array() });
    }

    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          success,
          error: "please try to login with currrent details ",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "please try to login with currrent details ",
        });
      }

      let token = jwt.sign({ user: user._id }, JWT_SECRET);
      success = true;
      res.send({ success, token });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some internal error occured ");
    }
  }
);

//// Route 3 Get login user details post  "/auth/getuser"
router.get(
  "/getuser",
  fetchUser,

  async (req, res) => {
    try {
      const userId = req.user;
      // console.log(userId);
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some internal error occured ");
    }
  }
);

module.exports = router;
