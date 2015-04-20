import React from "react";
import {AgentComponent} from "react-helix";
import css from "../../../util/css.js";
import {ACTIVE, COMPLETED, ALL} from "../model/TodoApp";
import {removeAllCompletedTodoItems, updateShownKind} from "../action/TodoApp";

const SHOWN_KINDS = [ACTIVE, COMPLETED, ALL];
const SHOWN_BUTTON_TEXT = {
  [ACTIVE]: "Active",
  [COMPLETED]: "Completed",
  [ALL]: "All"
};

export default class Footer extends AgentComponent {
  constructor(props) {
    super(props);
    this.onClearButtonClick = this.onClearButtonClick.bind(this);
    this.onSwitchKindButtonClick = this.onSwitchKindButtonClick.bind(this);
  }

  render() {
    const countAll = this.props.countAll;
    const countCompleted = this.props.countCompleted;
    const shownKind = this.props.shownKind;

    return <div className="todo-footer">
      <span className="todo-footer_counter-area">
        {countAll} items left
      </span>
      <span className={"todo-footer_clear-button-area" + (countCompleted > 0 ? " todo-footer_target-exists" : "")}>
        <button onClick={this.onClearButtonClick}>
          Clear completed ({countCompleted})
        </button>
      </span>
      <span className="todo-footer_switch-buttons-area">
        {SHOWN_KINDS.map(kind =>
          <button
            key={kind}
            className={kind === shownKind ? "todo-footer_selected" : ""}
            data-kind={kind}
            onClick={this.onSwitchKindButtonClick}
          >
            {SHOWN_BUTTON_TEXT[kind]}
          </button>
        )}
      </span>
      <span className="todo-footer_explain-area">Double-click to edit a todo</span>
    </div>;
  }

  onClearButtonClick(/*event*/) {
    this.request(removeAllCompletedTodoItems);
  }

  onSwitchKindButtonClick(event) {
    const kind = Number(event.target.dataset.kind);
    this.request(updateShownKind, kind);
  }
}

Footer.displayName = "Footer";
Footer.propTypes = {
  countAll: React.PropTypes.number.isRequired,
  countCompleted: React.PropTypes.number.isRequired,
  shownKind: React.PropTypes.oneOf(SHOWN_KINDS).isRequired
};

css(`
.todo-footer {
  position: absolute;
  left: 0.4em;
  top: calc(100% + 0.125em + 1px);
  width: calc(100% - 1.8em);
  padding: 0.25em 0.5em;
  border-top: 1px solid #9E9E9E;
  text-align: center;
  background: #F8F8F8;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.5);
}

.todo-footer button {
  margin: 1px;
  padding: 0.5em;
  background: none;
  border: 1px solid #C5CAE9;
  border-radius: 3px;
  cursor: pointer;
}
.todo-footer button:hover {
  background: #E8EAF6;
  border: 1px solid #3F51B5;
}
.todo-footer button:active {
  background: #C5CAE9;
}
.todo-footer button.selected {
  color: #FF3D00;
  text-decoration: underline;
}

.todo-footer_counter-area {
  float: left;
  padding: 0.25em 0;
}

.todo-footer_clear-button-area {
  float: right;
  visibility: hidden;
}

.todo-footer_clear-button-area.todo-footer_target-exists {
  visibility: visible;
}

.todo-footer_switch-buttons-area {
  display: inline-block;
  margin: auto;
}

.todo-footer_explain-area {
  display: block;
  color: gray;
  font-size: 0.75em;
  white-space: nowrap;
}
`);
