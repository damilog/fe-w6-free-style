import { _ } from "./util.js";
export default class RenderManager {
  constructor() {}

  renderPage(parent, template) {
    _.$Remove(".changeable-area");
    parent.insertAdjacentHTML("beforeend", template);
  }
}
