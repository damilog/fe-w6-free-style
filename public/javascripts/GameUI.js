import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import EndingUI from "./EndingUI.js";

export default class GameUI {
  constructor(boardContainer, json) {
    this.$boardContainer = boardContainer;
    this.subwayJsonData = json;
    this.renderManager = new RenderManager();
    this.line;
    this.bet;
    this.userList;
    this.init();
  }

  init() {
    _.$(".board-wrap__start__btn").addEventListener(
      "click",
      this.drawGame.bind(this)
    );

    this.prepareNextPage();
  }

  async drawGame() {
    _.$Remove(".changeable-area");
    this.renderManager.renderLastChild(
      this.$boardContainer,
      this.makeTemplate()
    );
    this.onEvent();

    await this.socketOnloadSettingGame.call(this);
    const userList = await this.socketOnUserList.call(this);
    this.drawUserList.call(this, userList); //얘도 undefined
  }

  socketOnloadSettingGame() {
    const socket = io();
    socket.on("loadSettingGame", function ({ line, bet }) {
      this.line = line;
      this.bet = bet;
    });
  }

  socketOnUserList() {
    const socket = io();
    let userList;
    socket.on("userList", function (data) {
      //   this.userList = data;
      userList = data;
      console.log(userList);
    });
    return userList;
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
  setCountDown() {}
  changeTurn() {}

  checkEnteredStation() {
    //this 바인딩이 왜안될까? this.line이 undefined로 찍힘
    console.log(this.line);
    const $blockWrap = _.$(".borad-wrap__game__wrap");
    const currentInput = _.$(".board-wrap__answer__input").value;
    const stationBlockTemplate = this.makeEnteredStationElem(
      this.line,
      currentInput
    );
    this.renderManager.renderLastChild($blockWrap, stationBlockTemplate);
    this.isCorrect();
    // if (!this.isCorrect(currentInput))
    //   paintIncorrectStationBlock(_.$(".borad-wrap__game__wrap__line"));
  }

  paintIncorrectStationBlock(el) {
    el.classList.add(`incorrect-answer`);
  }

  isCorrect(answer) {
    return this.subwayJsonData[`0${this.line}호선`].includes(answer);
    //배열안에 없는 스테이션이면~
  }

  prepareNextPage() {
    const endingUI = new EndingUI(this.$boardContainer, this.subwayJsonData);
  }

  onEvent() {
    _.$(".board-wrap__answer__btn").addEventListener(
      "click",
      this.checkEnteredStation.bind(this)
    );
  }

  changeInputDisable() {}

  makeTemplate() {
    return `<div class="changeable-area">
      <section class="borad-wrap__user">
        <ul class="borad-wrap__user__list">
          <li class="borad-wrap__user__list__li user-turn">Kyle</li>
        </ul>
      </section>
      <section class="borad-wrap__game">
        <div class="borad-wrap__game__wrap">
          <div class="borad-wrap__game__wrap__line line1 incorrect-answer">
            <span class="borad-wrap__game__wrap__line__text">
              구로디지털단지
            </span>
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
