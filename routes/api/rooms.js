const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const users = require("../../src/users.js");

// @route   GET api/rooms/roomlist
// @desc    Return rooms
// @access  Private
router.get(
  "/roomList",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let roomList = Object.keys(users.roomList);
    console.log(roomList);
    res.json(roomList);
  }
);

module.exports = router;
