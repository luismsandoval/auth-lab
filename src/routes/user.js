"user strict";

const express = require("express");

const userCollection = require("../models/index.js").User;

const router = express.Router();

async function getOneUsers(req, res) {
  let id = req.params.id;
  let theUsers = await userCollection.read(id);
  res.status(200).json(theUsers);
}

async function createUsers(req, res) {
  let obj = req.body;
  let newUsers = await userCollection.create(obj);
  res.status(200).json(newUsers);
}

router.get("/user/:id, getOneUsers");
router.get("/user, createUsers");

module.exports = router;
