const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const Task = require("./models/taskModel");

app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://danylobodnar96:Pass1234@cluster0.uzcywzl.mongodb.net/trello-data"
);


app.use("/", require("./routes/taskRoute"));

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

app.listen(3001, function () {
  console.log("Running on port 3001");
});

app.put("/update/:id", async (req, res) => {
  const upid = req.params.id;
  const tasksList = req.body.tasksList;
  const newTask = new Task({
    tasksList,
  });
  Task.findOneAndUpdate(
    { _id: upid },
    { $set: { tasksList } },
    { new: true },
    (err, data) => {
      if (data == null) {
        res.send("nothing found");
      } else {
        res.send(data);
      }
    }
  );
});


