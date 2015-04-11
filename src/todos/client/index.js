import React from "react";
import TodoApp from "./view/TodoApp";
import {save, load} from "./action/TodoApp";

const app = React.render(
  <TodoApp initialModel={load()}/>,
  document.getElementById("main"));

if (typeof addEventListener === "function") {
  addEventListener("unload", () => {
    save(app.stageValue);
  });
}
