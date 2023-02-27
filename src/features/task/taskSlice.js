import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  tasksList: [],
  status: "idle",
  error: null,
};
export const fetchTask = createAsyncThunk("posts/fetchPosts", async (data) => {
  try {
    await axios.put(
      "https://trello-app-waw9.onrender.com/update/63fb4d8dd87e46a6d9938af0",
      data
    );
  } catch (error) {
    console.log(error);
  }
});

export const getTasks = createAsyncThunk("get/getTasks", async () => {
  const { data } = await axios.get("https://trello-app-waw9.onrender.com/get");
  return data;
  //return fetasch("https://trello-app-waw9.onrender.com/get").then((res) => res.json())
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
    removeBoard: (state, actions) => {
      state.tasksList.splice(actions.payload.boardIndex, 1);
    },
    changeTask: (state, actions) => {
      console.log(
        state.tasksList[actions.payload.boardIndex].tasks[
          actions.payload.taskIndex
        ].title
      );
      state.tasksList[actions.payload.boardIndex].tasks[
        actions.payload.taskIndex
      ].title = actions.payload.title;
      state.tasksList[actions.payload.boardIndex].tasks[
        actions.payload.taskIndex
      ].date = actions.payload.date;
    },
    sortTasks: (state) =>{
     for(let i in state.tasksList){
      state.tasksList[i].tasks.sort((a,b) => {
        return a.date - b.date
      })
     }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, actions) => {
        console.log("data",actions.payload[0].tasksList)
        state.tasksList = actions.payload[0].tasksList;
        state.status = "succeeded";
      })
      .addCase(getTasks.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.error.message;
      })
      .addCase(fetchTask.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.error.message;
      });
  },
});

export const {
  addTaskList,
  addTask,
  removeTask,
  addDraggedElement,
  removeBoard,
  changeTask,
  sortTasks
} = taskSlice.actions;

export const selectTaskList = (state) => state.task.tasksList;

export const selectError = (state) => state.task.error;

export const selectStatus = (state) => state.task.status;

export default taskSlice.reducer;
