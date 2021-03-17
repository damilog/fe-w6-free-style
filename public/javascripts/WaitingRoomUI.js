import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import SocketManager from "./SocketManager.js";
import JSONManager from "./JSONManager.js";

export default class WaitingRoomUI {
  constructor(boardContainer) {
    this.$boardContainer = boardContainer;
    this.renderManager = new RenderManager(this.$boardContainer);
    this.jsonManager = new JSONManager();
    this.stationListByLines;
    this.lineSize;
    this.init();
  }

  init() {
    this.onEvent();
    this.getStationListByLines();
  }

  onEvent() {
    _.$(".board-wrap__geton__btn").addEventListener(
      "click",
      this.drawWaitingRoom.bind(this)
    );
  }

  async getStationListByLines() {
    const jsonData = await this.jsonManager.requestData("lines");
    this.stationListByLines = this.jsonManager.parseByLines(jsonData);
    this.lineSize = Object.keys(this.stationListByLines).length;
  }

  drawLineInfoOnBtn() {
    for (let i = 1; i <= this.lineSize; i++) {
      const $currentBtnText = _.$(`#line${i}-text`);
      const currentLineSize = this.stationListByLines[`0${i}호선`].length;
      $currentBtnText.textContent = `${currentLineSize}개역 / 난이도 상`;
    }
  }

  drawWaitingRoom() {
    _.$Remove(".changeable-area");
    this.renderManager.renderAfterNav(this.makeTemplate());
    this.drawLineInfoOnBtn.call(this);
  }

  makeTemplate() {
    return `<div class="changeable-area">
    <section class="board-wrap__bet">
        <span class="board-wrap__bet__title">벌칙 👉</span>
        <input type="text" class="board-wrap__bet__input" />
        <button class="board-wrap__bet__btn">등록</button>
        <span class="board-wrap__bet__text">벌칙내용 value</span>
      </section>

      <section class="board-wrap__lines">
        <div class="board-wrap__lines__li" id="line1">
          <span class="board-wrap__lines__li__title">1호선</span>
          <span class="board-wrap__lines__li__text" id="line1-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line2">
          <span class="board-wrap__lines__li__title">2호선</span>
          <span class="board-wrap__lines__li__text" id="line2-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line3">
          <span class="board-wrap__lines__li__title">3호선</span>
          <span class="board-wrap__lines__li__text" id="line3-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line4">
          <span class="board-wrap__lines__li__title">4호선</span>
          <span class="board-wrap__lines__li__text" id="line4-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line5">
          <span class="board-wrap__lines__li__title">5호선</span>
          <span class="board-wrap__lines__li__text" id="line5-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line6">
          <span class="board-wrap__lines__li__title" id="line6">6호선</span>
          <span class="board-wrap__lines__li__text" id="line6-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line7">
          <span class="board-wrap__lines__li__title" id="line7">7호선</span>
          <span class="board-wrap__lines__li__text" id="line7-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line8">
          <span class="board-wrap__lines__li__title" id="line8">8호선</span>
          <span class="board-wrap__lines__li__text" id="line8-text"
            >10개역 / 난이도 상</span
          >
        </div>
        <div class="board-wrap__lines__li" id="line9">
          <span class="board-wrap__lines__li__title" id="line9">9호선</span>
          <span class="board-wrap__lines__li__text" id="line9-text"
            >10개역 / 난이도 상</span
          >
        </div>
      </section>
      <section class="board-wrap__start">
        <button class="board-wrap__start__btn">START</button>
      </section></div>`;
  }
}
