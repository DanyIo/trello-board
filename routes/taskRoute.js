const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");
const objectId = require("mongodb").ObjectID;


router.route("/create").post((req, res) => {
  const tasksList = req.body.tasksList;
  const newTask = new Task({
    tasksList,
  });
  newTask.save();
});

router.route("/get").get((req, res) => {
  Task.find().then((allTasks) => res.json(allTasks));
});



module.exports = router;
