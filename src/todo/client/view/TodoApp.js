import React from "react";
import {StageComponent} from "react-helix";
import css from "../../../util/css.js";
import TodoAppModel from "../model/TodoApp";
import Header from "./Header";
import Footer from "./Footer";
import TodoList from "./TodoList";

export default class TodoApp extends StageComponent {
  constructor(props) {
    super(props, "model");
    this.state = {
      model: (props && props.initialModel) || new TodoAppModel()
    };
  }

  render() {
    const model = this.stageValue;
    const todoItems = model.shownItems;
    const countActive = model.countItems(TodoAppModel.ACTIVE);
    const countCompleted = model.countItems(TodoAppModel.COMPLETED);
    const countAll = countActive + countCompleted;
    const shownKind = model.shownKind;

    return <div className="todo-app">
      <Header countActive={countActive}/>
      <TodoList value={todoItems}/>
      <Footer
        countAll={countAll}
        countCompleted={countCompleted}
        shownKind={shownKind}
      />
    </div>;
  }
}

TodoApp.displayName = "TodoApp";
TodoApp.propTypes = {
  initialModel: React.PropTypes.instanceOf(TodoAppModel)
};

css(`
.todo-app {
  position: relative;
  width: 600px;
  min-height: 300px;
  margin: 24px auto;
  background: white;
  box-shadow: 0 8px 32px 8px rgba(0,0,0,0.5);
  color: black;
}

.todo-app::before {
  display: block;
  content: "";
  position: absolute;
  left: 0.2em;
  top: 100%;
  width: calc(100% - 0.4em);
  height: 0.125em;
  background: #EEE;
  border-top: 1px solid #9E9E9E;
}

@media (max-width: 640px) {
  .todo-app {
    width: 100%;
    margin: 0;
  }
}
`);
