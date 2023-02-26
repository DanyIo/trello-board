const mongoose = require("mongoose")

const taskSchema = {
    tasksList:Array,
}
const Task = mongoose.model("Task", taskSchema)

module.exports = Task;