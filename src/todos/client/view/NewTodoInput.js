import React from "react";
import {AgentComponent} from "react-helix";
import css from "../../../util/css.js";
import {addTodoItem} from "../action/TodoApp";


export default class NewTodoInput extends AgentComponent {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    return <input
      className="new-todo-input"
      type="text"
      placeholder="What needs to be done?"
      onKeyDown={this.onKeyDown}
      autoFocus={true}
    />;
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      const input = event.target;
      const title = input.value.trim();
      input.value = "";
      if (title !== "") {
        this.request(addTodoItem, title);
      }
    }
  }
}

NewTodoInput.displayName = "NewTodoInput";

css(`
.new-todo-input {
  padding: 0.25em;
  font-size: 1.5em;
  border: none;
  border-bottom: 1px solid #9E9E9E;
}
`);
