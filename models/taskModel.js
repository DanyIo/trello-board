const mongoose = require("mongoose")

const taskSchema = {
    tasksList:Array,
}
const Task = mongoose.model("porn", taskSchema)

module.exports = Task;