import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Main from "./components/Main/main";
import Header from "./components/Header/header";

function App() {
  return (
    <div>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
