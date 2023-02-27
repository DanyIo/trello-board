import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import taskReducer from "../features/task/taskSlice";
import thunk from "redux-thunk";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});
