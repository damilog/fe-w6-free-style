import { _ } from "./util.js";
import JSONManager from "./JSONManager.js";
import HomeUI from "./HomeUI.js";
import WaitingRoomUI from "./WaitingRoomUI.js";
import GameUI from "./GameUI.js";
import EndingUI from "./EndingUI.js";

async function init() {
  const $boardContainer = _.$(".board-wrap");
  const homeUI = new HomeUI($boardContainer);
  const jsonManager = new JSONManager();
  const jsonData = await jsonManager.requestData("lines");
  const waitingRoomUI = new WaitingRoomUI($boardContainer, jsonData);
}

init();
