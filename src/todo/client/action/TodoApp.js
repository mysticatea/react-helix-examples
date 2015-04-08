import {Seq} from "immutable";
import TodoApp from "../model/TodoApp";
import TodoItem from "../model/TodoItem";

export function addTodoItem(model, title) {
  return model.withItems(items =>
    items.unshift(new TodoItem(title.trim()))
  );
}

export function removeTodoItem(model, id) {
  return model.withItems(items =>
    items.filter(item => item.id !== id)
  );
}

export function removeAllCompletedTodoItems(model) {
  return model.withItems(items =>
    items.filter(item => item.completed === false)
  );
}

export function updateTodoTitle(model, id, value) {
  return model.withItems(items =>
    items.map(item => (item.id !== id) ? item : item.withTitle(value.trim()))
  );
}

export function updateTodoCompleted(model, id, value) {
  return model.withItems(items =>
    items.map(item => (item.id !== id) ? item : item.withCompleted(value))
  );
}

export function updateAllTodoCompleted(model, value) {
  return model.withItems(items =>
    items.map(item => item.withCompleted(value))
  );
}

export function updateShownKind(model, value) {
  return model.withShownKind(value);
}

export function save(model) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("todos", JSON.stringify(model.items));
  }
}

export function load() {
  if (typeof localStorage !== "undefined") {
    const serialized = localStorage.getItem("todos");
    if (serialized) {
      const items = Seq(JSON.parse(serialized))
        .map(item => new TodoItem(item))
        .toList();

      return new TodoApp({items});
    }
  }
  return new TodoApp();
}
