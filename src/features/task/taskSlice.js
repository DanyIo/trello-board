import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  tasksList: [],

};
export const fetchTask = createAsyncThunk("posts/fetchPosts", async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/update/63fb4d8dd87e46a6d9938af0",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getTasks = createAsyncThunk("get/getTasks", async() => {
  return fetch("http://localhost:3001/get").then((res) => res.json())
})

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskList: (state, actions) => {
      const task = { name: actions.payload, tasks: [] };
      state.tasksList.push(task);
    },
    addTask: (state, actions) => {
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
      state.tasksList[actions.payload.boardIndex].tasks.splice(
        actions.payload.taskIndex + 1,
        0,
        actions.payload.name
      );
    },
    removeBoard:(state,actions)=> {
      state.tasksList.splice(actions.payload.boardIndex, 1)
    },
    changeTask:(state,actions) => {
      console.log(state.tasksList[actions.payload.boardIndex].tasks[actions.payload.taskIndex].title)
      state.tasksList[actions.payload.boardIndex].tasks[actions.payload.taskIndex].title = actions.payload.title
      state.tasksList[actions.payload.boardIndex].tasks[actions.payload.taskIndex].date = actions.payload.date
    }
  },
  extraReducers: (builder) => {
    builder 
    .addCase(getTasks.fulfilled, (state,actions) => {
      state.tasksList =  actions.payload[0].tasksList
    })
    .addCase(getTasks.rejected,(state,actions) => {
      console.log(actions.payload)
    })
  }
});

export const { addTaskList, addTask, removeTask, addDraggedElement, removeBoard, changeTask } =
  taskSlice.actions;

export const selectTaskList = (state) => state.task.tasksList;

export default taskSlice.reducer;
