import {Record} from "immutable";

function generateId() {
  const n = generateId.n;
  generateId.n = (n === 0xFFFFF) ? 0 : 1 + n;
  return Date.now().toString(16) + ("0000" + n.toString(16)).slice(-5);
}
generateId.n = 0;

export default class TodoItem extends Record({
  id: "",
  title: "",
  completed: false
}) {
  constructor(objOrTitle) {
    super((objOrTitle && objOrTitle.id != null)
      ? objOrTitle
      : {id: generateId(), title: String(objOrTitle)}
    );
  }

  withTitle(value) {
    return this.set("title", value);
  }

  withCompleted(value) {
    return this.set("completed", value);
  }
}
