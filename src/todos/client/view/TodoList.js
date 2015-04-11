import React from "react";
import {Iterable} from "immutable";
import css from "../../../util/css.js";
import TodoItem from "./TodoItem";


export default class TodoList extends React.Component {
  render() {
    const list = this.props.value;
    return <ul className="todo-list">
      {list.map(todo => <TodoItem key={todo.id} value={todo}/>)}
    </ul>;
  }
}

TodoList.displayName = "TodoList";
TodoList.propTypes = {
  value: React.PropTypes.instanceOf(Iterable).isRequired
};

css(`
.todo-list {
  margin: 0;
  padding: 0.5em 0;
  list-style: none;
}
`);
