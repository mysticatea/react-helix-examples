import {Seq} from "immutable";
import TodoApp from "../model/TodoApp";
import TodoItem from "../model/TodoItem";

function assertType(value, name, type) {
  if (typeof value !== type) {
    throw new TypeError(`${name} should be a ${type}, but a ${typeof value}.`);
  }
}

function assertValidModel(value) {
  if (value instanceof TodoApp === false) {
    throw new TypeError("model should be an instance of TodoApp.");
  }
}

function assertValidShownKind(value, name) {
  switch (value) {
    case TodoApp.ACTIVE:
    case TodoApp.COMPLETED:
    case TodoApp.ALL:
      return;

    default:
      throw new Error(`${name} should be any of 1, 2, 3, but ${value}.`);
  }
}


export function addTodoItem(model, title) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
    assertType(title, "title", "string");
  }

  return model.withItems(items =>
    items.unshift(new TodoItem(title.trim()))
  );
}

export function removeTodoItem(model, id) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
    assertType(id, "id", "string");
  }

  return model.withItems(items =>
    items.filter(item => item.id !== id)
  );
}

export function removeAllCompletedTodoItems(model) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
  }

  return model.withItems(items =>
    items.filter(item => item.completed === false)
  );
}

export function updateTodoTitle(model, id, value) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
    assertType(id, "id", "string");
    assertType(value, "value", "string");
  }

  return model.withItems(items =>
    items.map(item => (item.id !== id) ? item : item.withTitle(value.trim()))
  );
}

export function updateTodoCompleted(model, id, value) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
    assertType(id, "id", "string");
    assertType(value, "value", "boolean");
  }

  return model.withItems(items =>
    items.map(item => (item.id !== id) ? item : item.withCompleted(value))
  );
}

export function updateAllTodoCompleted(model, value) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
    assertType(value, "value", "boolean");
  }

  return model.withItems(items =>
    items.map(item => item.withCompleted(value))
  );
}

export function updateShownKind(model, value) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
    assertValidShownKind(value, "value");
  }

  return model.withShownKind(value);
}

export function save(model) {
  if (process.env.NODE_ENV !== "production") {
    assertValidModel(model);
  }

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
