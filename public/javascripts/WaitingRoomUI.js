import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import GameUI from "./GameUI.js";

export default class WaitingRoomUI {
  constructor(boardContainer, json) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.renderManager = new RenderManager();
    this.lineSize;
    this.bet;
    this.lineNum;
    this.init();
  }

  init() {
    _.$(".board-wrap__geton__btn").addEventListener(
      "click",
      this.drawWaitingRoom.bind(this) //draw 전에 포괄할만한 메소드필요
    );
  }

  socketOnWaitingUser() {
    const socket = io();
    socket.on("waitingUser", function (data) {
      _.$(".board-wrap__bet__welcome").textContent = `${data} 입장 대기중..`;
    });
  }

  socketEmitSettingGame() {
    const socket = io();
    const setting = { bet: this.bet, line: this.lineNum };
    socket.emit("settingGame", setting);
  }

  drawWaitingRoom() {
    this.renderManager.renderPage(this.$boardContainer, this.makeTemplate());
    //여기부터 분리필요
    this.socketOnWaitingUser();

    this.onEvent();
    this.getStationListByLines();
    this.drawLineInfoOnBtn.call(this);
    // this.prepareNextPage(); 원래 있던 곳..
  }

  prepareNextPage() {
    console.log(this.lineNum, this.bet);
    const gameUI = new GameUI(
      this.$boardContainer,
      this.subwayJsonData,
      this.lineNum,
      this.bet
    );
  }

  getStationListByLines() {
    this.lineSize = Object.keys(this.subwayJsonData).length;
  }

  drawLineInfoOnBtn() {
    for (let i = 1; i <= this.lineSize; i++) {
      const $currentBtnText = _.$(`#line${i}-text`);
      const currentLineSize = this.subwayJsonData[`0${i}호선`].length;
      $currentBtnText.textContent = `${currentLineSize}개역`;
    }
  }

  onEvent() {
    _.$(".board-wrap__lines").addEventListener(
      "click",
      this.setSelectedLineData.bind(this)
    );
    _.$(".board-wrap__bet__input").addEventListener(
      "input",
      this.drawEnteredBetOnText.bind(this)
    );
    _.$(".board-wrap__start__submit").addEventListener(
      "click",
      this.socketEmitSettingGame.bind(this)
    );
  }

  setSelectedLineData(event) {
    if (event.target.className === "board-wrap__lines") return;
    const currentClickedLineBtn = event.target.closest(
      ".board-wrap__lines__li"
    );

    const lineNumber = currentClickedLineBtn.id.replace("line", "");
    this.lineNum = lineNumber;
    this.drawSelectedLineInfoOnText(lineNumber);
    this.prepareNextPage(); //뜬금 없지만 여기서 호출해야 line number가 할당된 this.line을 다음 페이지에 넘겨줄 수 있어서 여기서 호출했습니다..
  }

  drawSelectedLineInfoOnText(lineNum) {
    _.$(
      ".board-wrap__state__bet-line"
    ).textContent = `지하철 ${lineNum}호선 역 이름 대기 게임🔥`;
  }

  drawEnteredBetOnText() {
    const bet = _.$(".board-wrap__bet__input").value;
    this.bet = bet;
    _.$(".board-wrap__state__bet-text").textContent = `👉${bet}`;
  }

  makeTemplate() {
    return `<div class="changeable-area">
    <section class="board-wrap__bet">
        <span class="board-wrap__bet__title">벌칙 👉</span>
        <input type="text" class="board-wrap__bet__input" autofocus/>
        <span class="board-wrap__bet__welcome">Daisy 입장 대기중..</span>
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
        <button class="board-wrap__start__submit">등록</button>
        <button class="board-wrap__start__btn">START</button>
      </section></div>`;
  }
}
