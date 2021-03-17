import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import SocketManager from "./SocketManager.js";
import JSONManager from "./JSONManager.js";
import EndingUI from "./EndingUI.js";

export default class GameUI {
  constructor(boardContainer, json) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.renderManager = new RenderManager(this.$boardContainer);
    this.jsonManager = new JSONManager();
    this.init();
  }

  init() {
    _.$(".board-wrap__start__btn").addEventListener(
      "click",
      this.drawWaitingRoom.bind(this)
    );
  }

  drawWaitingRoom() {
    _.$Remove(".changeable-area");
    this.renderManager.renderAfterNav(this.makeTemplate());
    this.onEvent();
    this.prepareNextPage();
  }

  drawEnteredStation() {}

  isCorrect() {}

  checkAnswer() {}

  endGame() {}

  prepareNextPage() {
    const endingUI = new EndingUI(this.$boardContainer, this.subwayJsonData);
  }

  onEvent() {}

  makeTemplate() {
    return `<div class="changeable-area">
      <section class="borad-wrap__user">
        <ul class="borad-wrap__user__list">
          <li class="borad-wrap__user__list__li user-turn">Kyle</li>
          <li class="borad-wrap__user__list__li">Autumn</li>
          <li class="borad-wrap__user__list__li">Racoon</li>
          <li class="borad-wrap__user__list__li">Daisy</li>
          <li class="borad-wrap__user__list__li">Jenny</li>
          <li class="borad-wrap__user__list__li">Beemo</li>
          <li class="borad-wrap__user__list__li">Sienna</li>
        </ul>
      </section>
      <section class="borad-wrap__game">
        <div class="borad-wrap__game__wrap">
          <div class="borad-wrap__game__wrap__line line1 incorrect-answer">
            <span class="borad-wrap__game__wrap__line__text">
              구로디지털단지
            </span>
          </div>
          <div class="borad-wrap__game__wrap__line line1">
            <span class="borad-wrap__game__wrap__line__text">
              동대문역사문화공원
            </span>
          </div>
          <div class="borad-wrap__game__wrap__line line1">
            <span class="borad-wrap__game__wrap__line__text"> 신도림 </span>
          </div>
          <div class="borad-wrap__game__wrap__line line1">
            <span class="borad-wrap__game__wrap__line__text"> 신도림 </span>
          </div>
          <div class="borad-wrap__game__wrap__line line1">
            <span class="borad-wrap__game__wrap__line__text"> 신도림 </span>
          </div>
        </div>
      </section>
      <section class="board-wrap__answer">
        <span class="board-wrap__answer__user">Daisy</span>
        <input type="text" class="board-wrap__answer__input" />
        <button class="board-wrap__answer__btn">하차</button>
      </section>
    </div>`;
  }
}
