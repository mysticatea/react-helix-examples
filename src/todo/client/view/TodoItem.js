import React from "react";
import {AgentComponent} from "react-helix";
import css from "../../../util/css";
import TodoItemModel from "../model/TodoItem";
import {removeTodoItem,
        updateTodoTitle,
        updateTodoCompleted} from "../action/TodoApp";


export default class TodoItem extends AgentComponent {
  constructor(props) {
    super(props);
    this.state = {isEditing: false};
    this.onEditBlur = this.onEditBlur.bind(this);
    this.onEditKeyDown = this.onEditKeyDown.bind(this);
    this.onCompletedChange = this.onCompletedChange.bind(this);
    this.onLabelDoubleClick = this.onLabelDoubleClick.bind(this);
    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
  }

  componentDidUpdate() {
    const input = this.refs.titleEdit;
    if (input != null) {
      const dom = React.findDOMNode(input);
      const todo = this.props.value;
      dom.value = todo.title;
      dom.select();
      dom.focus();
    }
  }

  render() {
    const todo = this.props.value;
    if (this.state.isEditing) {
      return <li className="todo-item" key={todo.id}>
        <input
          ref="titleEdit"
          className="title-edit"
          type="text"
          onBlur={this.onEditBlur}
          onKeyDown={this.onEditKeyDown}
        />
      </li>;
    }
    else {
      const className = "todo-item" + (todo.completed ? " completed" : "");
      return <li className={className} key={todo.id}>
        <input
          className="completed-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={this.onCompletedChange}
        />
        <label onDoubleClick={this.onLabelDoubleClick}>
          {todo.title}
        </label>
        <button className="remove-button" onClick={this.onRemoveButtonClick}>
          ✖
        </button>
      </li>;
    }
  }

  onEditBlur(event) {
    this.saveTitle(event.target.value);
  }

  onEditKeyDown(event) {
    switch (event.keyCode) {
      case 13: /*Enter*/
        this.saveTitle(event.target.value);
        break;
      case 27: /*Escape*/
        this.setState({isEditing: false});
        break;
    }
  }

  onCompletedChange(event) {
    const id = this.props.value.id;
    const value = event.target.checked;
    this.requestTo(updateTodoCompleted, id, value);
  }

  onLabelDoubleClick(/*event*/) {
    this.setState({isEditing: true});
  }

  onRemoveButtonClick(/*event*/) {
    const id = this.props.value.id;
    this.requestTo(removeTodoItem, id);
  }

  saveTitle(value) {
    const id = this.props.value.id;
    this.setState({isEditing: false});
    if (value.trim() !== "") {
      this.requestTo(updateTodoTitle, id, value);
    }
  }
}

TodoItem.displayName = "TodoItem";
TodoItem.propTypes = {
  value: React.PropTypes.instanceOf(TodoItemModel).isRequired
};

css(`
.todo-item {
  position: relative;
  padding: 0.25em 0 0.25em 2em;
}
.todo-item.completed {
  color: gray;
  text-decoration: line-through;
}
.todo-item:hover {
  background: #E8EAF6;
}

.todo-item .title-edit {
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  font-size: inherit;
}

.todo-item .completed-checkbox {
  display: inline-block;
  position: absolute;
  left: 0;
  width: 2em;
  height: 1.5em;
  padding: 0;
}

.todo-item label {
  display: block;
}

.todo-item .remove-button {
  display: inline-block;
  visibility: hidden;
  position: absolute;
  top: 0.125em;
  right: 1em;
  width: 1em;
  height: 1em;
  padding: 0;
  border: none;
  background: none;
  color: #FF3D00;
  font-size: 1.5em;
  line-height: 1;
  cursor: pointer;
}
.todo-item:hover .remove-button {
  visibility: visible;
}
`);
