import { _ } from "./util.js";
export default class RenderManager {
  constructor() {}

  renderLastChild(parent, template) {
    parent.insertAdjacentHTML("beforeend", template);
  }
}
