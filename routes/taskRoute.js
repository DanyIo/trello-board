const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");


router.route("/get").get((req, res) => {
  Task.find().then((allTasks) => res.json(allTasks));
});



module.exports = router;
