import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import WaitingRoomUI from "./WaitingRoomUI.js";

export default class HomeUI {
  constructor(boardContainer, json) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.socket = io();
    this.$userCount = _.$(".board-wrap__nav__passenger");
    this.userName;
    this.renderManager = new RenderManager();
    this.init();
  }

  init() {
    this.renderManager.renderLastChild(
      this.$boardContainer,
      this.makeTemplate()
    );
    this.prepareNextPage();
    this.socket.on("usercount", data => this.drawUserCount(data));
    this.onEvent();
  }

  onEvent() {
    _.$(".board-wrap__user__input").addEventListener(
      "input",
      this.drawUserName.bind(this)
    );

    _.$(".board-wrap__geton__btn").addEventListener("click", () => {
      this.socket.emit("login", this.userName); //유저 이름을 서버에 보냄
    });
  }

  prepareNextPage() {
    const waitingRoomUI = new WaitingRoomUI(
      this.$boardContainer,
      this.subwayJsonData
    );
  }

  drawUserCount(count) {
    this.$userCount.textContent = `현재 탑승인원 ${count}명`;
  }

  drawUserName() {
    this.userName = _.$(".board-wrap__user__input").value;
    const $userNameText = _.$(".board-wrap__text__name");
    $userNameText.textContent = `${this.userName} 님은,,`;
  }

  makeTemplate() {
    return `<div class="changeable-area">
    <section class="board-wrap__text">
      <div class ="board-wrap__text__name">______님은,,</div>
      <div>어느 역에서 내리시나효?,,( ͡° ͜ʖ ͡°)</div>
    </section>
    <section class="board-wrap__user">
      <input type="text" class="board-wrap__user__input" autofocus/>
    </section>
    <section class="board-wrap__geton">
      <button class="board-wrap__geton__btn">승차하기</button>
    </section>
    <section class="board-wrap__img">
      <img
        src="https://data.whicdn.com/images/342939916/original.gif"
        alt=""
        width="700px"
        height="400px"
      />
    </section></div>`;
  }

  //getSocketSignal() {}
}
