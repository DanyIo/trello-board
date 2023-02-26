import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  tasksList: [
    {
      name: "To Do 📝",
      tasks: [
        { title: "Fishing", date: "1000" },
        { title: "Homework", date: "10" },
      ],
    },
    { name: "Doing 🔨", tasks: [] },
    { name: "Done ✅", tasks: [{ title: "Gym", date: "1000" }] },
  ],
};
export const fetchTask = createAsyncThunk("posts/fetchPosts", async (data) => {
  try {
    console.log("data", data);
    const response = await axios.put(
      "http://localhost:3001/update/63fb4d8dd87e46a6d9938af0",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskList: (state, actions) => {
      const task = { name: actions.payload, tasks: [] };
      state.tasksList.push(task);
    },
    addTask: (state, actions) => {
      console.log(actions.payload);
      const task = {
        title: actions.payload.name.title,
        date: actions.payload.name.date,
      };
      state.tasksList[actions.payload.index].tasks.push(task);
    },
    removeTask: (state, actions) => {
      state.tasksList[actions.payload.boardIndex].tasks.splice(
        actions.payload.taskIndex,
        1
      );
    },
    addDraggedElement: (state, actions) => {
      console.log(actions.payload);
      state.tasksList[actions.payload.boardIndex].tasks.splice(
        actions.payload.taskIndex + 1,
        0,
        actions.payload.name
      );
    },
  },
});

export const { addTaskList, addTask, removeTask, addDraggedElement } =
  taskSlice.actions;

export const selectTaskList = (state) => state.task.tasksList;

export default taskSlice.reducer;
