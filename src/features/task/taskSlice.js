import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // tasksList: ["To Do 📝"{

  // }, "Doing 🔨", "Done ✅"],
  tasksList: [
    { name: "To Do 📝", tasks: ["Go fishing", "Homework"] },
    { name: "Doing 🔨", tasks: [] },
    { name: "Done ✅", tasks: ["Gym"] },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTaskList: (state, actions) => {
      const task = { name: actions.payload, tasks: [] };
      state.tasksList.push(task);
    },
    addTask: (state, actions) => {
      state.tasksList[actions.payload.index].tasks.push(actions.payload.name);
    },
    removeTask: (state, actions) => {
      console.log(actions.payload);
      state.tasksList[actions.payload.boardIndex].tasks.splice(
        actions.payload.taskIndex,
        1
      );
    },
    addDraggedElement: (state, actions) => {
      state.tasksList[actions.payload.boardIndex].tasks.splice(
        actions.payload.taskIndex + 1,
        0,
        actions.payload.item
      );
    },
  },
});

export const { addTaskList, addTask, removeTask, addDraggedElement } =
  taskSlice.actions;

export const selectTaskList = (state) => state.task.tasksList;

export default taskSlice.reducer;
