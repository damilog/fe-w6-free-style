import { _ } from "./util.js";
import JSONManager from "./JSONManager.js";
import HomeUI from "./HomeUI.js";

async function init() {
  const $boardContainer = _.$(".board-wrap");
  const jsonManager = new JSONManager();
  const jsonData = await jsonManager.requestData("lines");
  const parsedJsonData = jsonManager.parseByLines(jsonData);
  const homeUI = new HomeUI($boardContainer, parsedJsonData);
}

init();
