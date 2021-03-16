import { _ } from "./util.js";
export default class RenderManager {
  constructor(boardContainer) {
    this.$boardContainer = boardContainer;
  }

  renderAfterNav(template) {
    this.$boardContainer.insertAdjacentHTML("beforeend", template);
  }
  
}
