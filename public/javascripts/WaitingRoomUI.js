import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import SocketManager from "./SocketManager.js";
import JSONManager from "./JSONManager.js";
import GameUI from "./GameUI.js";

export default class WaitingRoomUI {
  constructor(boardContainer, json) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.renderManager = new RenderManager(this.$boardContainer);
    this.jsonManager = new JSONManager();
    this.stationListByLines;
    this.lineSize;
    this.init();
  }

  init() {
    _.$(".board-wrap__geton__btn").addEventListener(
      "click",
      this.drawWaitingRoom.bind(this)
    );
    this.getStationListByLines();
  }

  drawWaitingRoom() {
    _.$Remove(".changeable-area");
    this.renderManager.renderAfterNav(this.makeTemplate());
    this.drawLineInfoOnBtn.call(this);
    this.onEvent();
    this.prepareNextPage();
  }

  prepareNextPage() {
    const gameUI = new GameUI(this.$boardContainer, this.subwayJsonData);
  }

  async getStationListByLines() {
    this.stationListByLines = this.jsonManager.parseByLines(
      this.subwayJsonData
    );
    this.lineSize = Object.keys(this.stationListByLines).length;
  }

  drawLineInfoOnBtn() {
    for (let i = 1; i <= this.lineSize; i++) {
      const $currentBtnText = _.$(`#line${i}-text`);
      const currentLineSize = this.stationListByLines[`0${i}호선`].length;
      $currentBtnText.textContent = `${currentLineSize}개역`;
    }
  }

  onEvent() {
    this.addLineBtnClickEvent.call(this);
    this.addBetInputEvent.call(this);
  }

  addLineBtnClickEvent() {
    _.$(".board-wrap__lines").addEventListener(
      "click",
      this.setSelectedLineData.bind(this)
    );
  }

  addBetInputEvent() {
    _.$(".board-wrap__bet__input").addEventListener(
      "input",
      this.drawEnteredBetOnText.bind(this)
    );
    //const gameUI = new GameUI($boardContainer, jsonData);
  }

  setSelectedLineData(event) {
    if (event.target.className === "board-wrap__lines") return;
    const currentClickedLineBtn = event.target.closest(
      ".board-wrap__lines__li"
    );
    const lineNumber = currentClickedLineBtn.id.replace("line", "");
    this.drawSelectedLineInfoOnText(lineNumber);
  }

  drawSelectedLineInfoOnText(lineNum) {
    _.$(
      ".board-wrap__state__bet-line"
    ).textContent = `지하철 ${lineNum}호선 역 이름 대기 게임🔥`;
  }

  drawEnteredBetOnText() {
    const bet = _.$(".board-wrap__bet__input").value;
    _.$(".board-wrap__state__bet-text").textContent = `👉${bet}`;
  }

  makeLinesTemplate() {
    const temp = `  <section class="board-wrap__lines">
   <div class="board-wrap__lines__li" id="line1">
     <span class="board-wrap__lines__li__title">1호선</span>
     <span class="board-wrap__lines__li__text" id="line1-text"
       ></span
     >
   </div>`;
  }

  makeTemplate() {
    return `<div class="changeable-area">
    <section class="board-wrap__bet">
        <span class="board-wrap__bet__title">벌칙 👉</span>
        <input type="text" class="board-wrap__bet__input" autofocus/>
        <button class="board-wrap__bet__btn">등록</button>
      </section>

      <section class="board-wrap__lines">
        <div class="board-wrap__lines__li" id="line1">
          <span class="board-wrap__lines__li__title">1호선</span>
          <span class="board-wrap__lines__li__text" id="line1-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line2">
          <span class="board-wrap__lines__li__title">2호선</span>
          <span class="board-wrap__lines__li__text" id="line2-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line3">
          <span class="board-wrap__lines__li__title">3호선</span>
          <span class="board-wrap__lines__li__text" id="line3-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line4">
          <span class="board-wrap__lines__li__title">4호선</span>
          <span class="board-wrap__lines__li__text" id="line4-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line5">
          <span class="board-wrap__lines__li__title">5호선</span>
          <span class="board-wrap__lines__li__text" id="line5-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line6">
          <span class="board-wrap__lines__li__title" id="line6">6호선</span>
          <span class="board-wrap__lines__li__text" id="line6-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line7">
          <span class="board-wrap__lines__li__title" id="line7">7호선</span>
          <span class="board-wrap__lines__li__text" id="line7-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line8">
          <span class="board-wrap__lines__li__title" id="line8">8호선</span>
          <span class="board-wrap__lines__li__text" id="line8-text"
            ></span
          >
        </div>
        <div class="board-wrap__lines__li" id="line9">
          <span class="board-wrap__lines__li__title" id="line9">9호선</span>
          <span class="board-wrap__lines__li__text" id="line9-text"
            ></span
          >
        </div>
      </section>
      <section class="board-wrap__state">
      <div class ="board-wrap__state__bet-text"></div>
      <div class ="board-wrap__state__bet-line"></div>
    </section>
      <section class="board-wrap__start">
        <button class="board-wrap__start__btn">START</button>
      </section></div>`;
  }
}
