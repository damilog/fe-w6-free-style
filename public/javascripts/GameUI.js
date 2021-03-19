import { _, delay } from "./util.js";
import RenderManager from "./RenderManager.js";
import EndingUI from "./EndingUI.js";

export default class GameUI {
  constructor(boardContainer, json, line, bet) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.renderManager = new RenderManager();
    this.finished = false;
    this.line = line;
    this.bet = bet;
    this.userList;
    this.init();
  }

  init() {
    _.$(".board-wrap__start__btn").addEventListener(
      "click",
      this.drawGame.bind(this)
    );
  }

  async drawGame() {
    this.renderManager.renderPage(this.$boardContainer, this.makeTemplate());

    this.socketOnWaitingUser();
    this.socketOnloadSettingGame();
    this.socketOnUserList();

    this.onEvent();
  }

  onEvent() {
    _.$(".board-wrap__answer__btn").addEventListener(
      "click",
      this.checkEnteredStation.bind(this) //
    );
  }

  test() {}

  async checkEnteredStation() {
    const $blockWrap = _.$(".borad-wrap__game__wrap");
    const currentInput = _.$(".board-wrap__answer__input").value;
    let incorrectAnswerClass;

    if (!this.isCorrect(currentInput)) {
      incorrectAnswerClass = "incorrect-answer";
      this.drawIncorrectAnswerResult();
      _.$(".board-wrap__answer__input").disabled = true;
      _.$(".board-wrap__answer__btn").disabled = true;
      this.finished = true;
      await delay(2000);
      this.prepareNextPage();
    } else {
      incorrectAnswerClass = "";
    }

    const template = `<div class="borad-wrap__game__wrap__line line${this.line} ${incorrectAnswerClass}">
    <span class="borad-wrap__game__wrap__line__text">
      ${currentInput}
    </span>
  </div> `;

    $blockWrap.insertAdjacentHTML("beforeend", template);
  }

  socketOnloadSettingGame() {
    const socket = io();
    socket.on("loadSettingGame", function ({ line, bet }) {
      //   this.line = line; 여기 안먹힘;
      //   this.bet = bet;
    });
  }

  socketOnUserList() {
    const socket = io();

    socket.on("userList", function (users) {
      // this.userList = users; //이게 안됨
      const template = users.reduce((acc, user) => {
        return acc + `<li class="borad-wrap__user__list__li">${user}</li>`;
      }, "");
      const $wrap = _.$(".borad-wrap__user__list");
      $wrap.insertAdjacentHTML("beforeend", template);
    });
  }

  socketOnWaitingUser() {
    const socket = io();
    socket.on("waitingUser", function (data) {
      _.$(".board-wrap__answer__user").textContent = `${data}`;
    });
  }

  socketEmitAnswer(input) {
    const socket = io();
    socket.emit("answer", input);
  }

  socketOnAnswerList(input) {
    const socket = io();
    socket.on("answerList", function (answerList) {});
  }

  drawUserList(data) {
    const userListTemplate = this.drawUserInGame(data);
    _.$(".wrap__user__list").innerHTML(userListTemplate);
  }

  drawUserInGame(users) {
    return users.reduce((acc, user) => {
      return acc + `<li class="borad-wrap__user__list__li">${user}</li>`;
    }, "");
  }

  isCorrect(answer) {
    return this.subwayJsonData[`0${this.line}호선`].includes(answer);
  }

  prepareNextPage() {
    const endingUI = new EndingUI(this.$boardContainer, this.subwayJsonData);
  }

  drawIncorrectAnswerResult() {
    _.$(".board-wrap__result").textContent = "오답입니다 🤦‍♀️";
  }

  makeTemplate() {
    return `<div class="changeable-area">
      <section class="borad-wrap__user">
        <ul class="borad-wrap__user__list">
        </ul>
      </section>
      <section class="borad-wrap__game">
        <div class="borad-wrap__game__wrap">
        </div>
      </section>
      <section class="board-wrap__answer">
        <span class="board-wrap__answer__user">Daisy</span>
        <input type="text" class="board-wrap__answer__input" />
        <button class="board-wrap__answer__btn">하차</button>
      </section>
      <section class="board-wrap__result"></section>
    </div>`;
  }
}
