const mongoose = require("mongoose")

const taskSchema = {
    tasksList:Array,
}
const Task = mongoose.model("dashBoard", taskSchema)

module.exports = Task;