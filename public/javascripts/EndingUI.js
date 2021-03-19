import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import HomeUI from "./HomeUI.js";
import SocketManager from "./SocketManager.js";

export default class EndingUI {
  constructor(boardContainer) {
    this.$boardContainer = boardContainer;
    this.renderManager = new RenderManager();
    this.init();
  }

  async init() {
    await this.drawEnding();
    this.socketOnWaitingUser();
    this.socketOnBet();
    this.onEvent();
  }

  drawEnding() {
    this.renderManager.renderPage(this.$boardContainer, this.makeTemplate());
  }

  async prepareNextPage() {
    await _.delay(2000);
    const homeUI = new HomeUI(this.$boardContainer, this.subwayJsonData);
  }

  socketOnWaitingUser() {
    const socket = io();
    socket.on("waitingUser", function (data) {
      _.$(".board-wrap__text__name").textContent = `${data} 님은,,`;
      _.$(
        ".board-wrap__result__text__user"
      ).textContent = `주인공은 ${data} 👻`;
    });
  }

  socketOnBet() {
    const socket = io();
    socket.on("bet", function (bet) {
      _.$(".board-wrap__result__text__bet").textContent = `${bet} 의`;
    });
  }

  onEvent() {
    _.$(".board-wrap__geton__btn").addEventListener(
      "click",
      this.prepareNextPage.bind(this)
    );
  }

  makeTemplate() {
    return `<div class="changeable-area">
      <section class="board-wrap__text">
        <div class="board-wrap__text__name"></div>
        <div>저희와 함께 하차하실 수 없습니다,,( ͡° ͜ʖ ͡°)</div>
      </section>
      <section class="board-wrap__result">
        <div class="board-wrap__result__text">
          <span class="board-wrap__result__text__bet">___의 </span>
          <span class="board-wrap__result__text__user"
            ></span
          >
        </div>
      </section>
      <section class="board-wrap__geton">
        <button class="board-wrap__geton__btn">다시 승차하기</button>
      </section>
      <section class="board-wrap__img">
        <img
          src="https://data.whicdn.com/images/342939916/original.gif"
          alt=""
          width="700px"
          height="400px"
        />
      </section>
    </div>`;
  }
}
