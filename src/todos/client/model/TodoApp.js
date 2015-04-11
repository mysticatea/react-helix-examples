import {Seq, List, Record} from "immutable";
import TodoItem from "./TodoItem";

export const ACTIVE = 1;
export const COMPLETED = 2;
export const ALL = 3;

export default class TodoApp extends Record({
  items: List(),
  shownKind: ALL
}) {
  static get ACTIVE() { return ACTIVE; }
  static get COMPLETED() { return COMPLETED; }
  static get ALL() { return ALL; }

  get shownItems() {
    switch (this.shownKind) {
      case ACTIVE:
        return this.items.toSeq().filter(item => item.completed === false);

      case COMPLETED:
        return this.items.toSeq().filter(item => item.completed);

      case ALL:
        return this.items;

      default:
        throw new Error(`Unknown kind: ${this.shownKind}`);
    }
  }

  countItems(shownKind) {
    switch (shownKind) {
      case ACTIVE:
        return this.items.reduce(
          (count, item) => (item.completed ? count : 1 + count), 0);

      case COMPLETED:
        return this.items.reduce(
          (count, item) => (item.completed ? 1 + count : count), 0);

      case ALL:
        return this.items.size;

      default:
        throw new Error(`Unknown kind: ${shownKind}`);
    }
  }

  withItems(mutator) {
    return this.set("items", mutator(this.items));
  }

  withShownKind(value) {
    return this.set("shownKind", value);
  }
}
