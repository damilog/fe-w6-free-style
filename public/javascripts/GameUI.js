import { _, delay } from "./util.js";
import RenderManager from "./RenderManager.js";
import EndingUI from "./EndingUI.js";

export default class GameUI {
  constructor(boardContainer, json, line) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.renderManager = new RenderManager();
    this.line = line;
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
    this.socketOnUserList();
    this.onEvent();
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

  onEvent() {
    _.$(".board-wrap__answer__btn").addEventListener(
      "click",
      this.checkEnteredStation.bind(this)
    );
  }

  drawAnswerList(className, answer) {
    const $blockWrap = _.$(".borad-wrap__game__wrap");
    const template = `<div class="borad-wrap__game__wrap__line line${this.line} ${className}">
    <span class="borad-wrap__game__wrap__line__text">
      ${answer}
    </span>
  </div> `;
    $blockWrap.insertAdjacentHTML("beforeend", template);
  }

  async checkEnteredStation() {
    const currentInput = _.$(".board-wrap__answer__input").value;
    let incorrectAnswerClass;

    if (!this.isCorrect(currentInput)) {
      incorrectAnswerClass = "incorrect-answer";
      this.drawIncorrectAnswerResult();
      this.drawAnswerList(incorrectAnswerClass, currentInput);
      _.$(".board-wrap__answer__input").disabled = true;
      _.$(".board-wrap__answer__btn").disabled = true;
      await delay(2000);
      this.prepareNextPage();
    } else {
      incorrectAnswerClass = "";
      this.drawAnswerList(incorrectAnswerClass, currentInput);
    }
  }

  isCorrect(answer) {
    return this.subwayJsonData[`0${this.line}호선`].includes(answer);
  }

  prepareNextPage() {
    const endingUI = new EndingUI(this.$boardContainer);
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
  ///---보류-------------
  // socketEmitAnswer(input) {
  //   const socket = io();
  //   socket.emit("answer", input);
  // }

  // socketOnAnswerList(input) {
  //   const socket = io();
  //   socket.on("answerList", function (answerList) {});
  // }
}
