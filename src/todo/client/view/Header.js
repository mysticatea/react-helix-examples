import React from "react";
import {AgentComponent} from "react-helix";
import css from "../../../util/css.js";
import {updateAllTodoCompleted} from "../action/TodoApp";
import NewTodoInput from "./NewTodoInput";

export default class Header extends AgentComponent {
  constructor(props) {
    super(props);
    this.onCompletedChange = this.onCompletedChange.bind(this);
  }

  render() {
    const countActive = this.props.countActive;

    return <div className="todo-header">
      <div className="todo-header-bar"/>
      <input
        className="todo-all-completed"
        type="checkbox"
        checked={!countActive}
        onChange={this.onCompletedChange}
      />
      <NewTodoInput/>
    </div>;
  }

  onCompletedChange(event) {
    const value = event.target.checked;
    this.requestTo(updateAllTodoCompleted, value);
  }
}

Header.displayName = "Header";
Header.propTypes = {
  countActive: React.PropTypes.number.isRequired
};

css(`
.todo-header {
  position: relative;
  padding: calc(1em + 2px) 0 0 2em;
}

.todo-header > .todo-header-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1em;
  background: #3F51B5;
  border-bottom: 2px solid #1A237E;
}

.todo-header > .todo-all-completed {
  display: inline-block;
  position: absolute;
  top: 2em;
  left: 0;
  width: 2em;
  height: 1.5em;
  padding: 0;
}

.todo-header > input[type="text"] {
  box-sizing: border-box;
  width: 100%;
}
`);
