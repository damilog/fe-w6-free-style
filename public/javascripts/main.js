import { _ } from "./util.js";
import HomeUI from "./HomeUI.js";
import WaitingRoomUI from "./WaitingRoomUI.js";
const $boardContainer = _.$(".board-wrap");

const homeUI = new HomeUI($boardContainer);
const waitingRoomUI = new WaitingRoomUI($boardContainer);

// jsonManager.requestData("lines");
