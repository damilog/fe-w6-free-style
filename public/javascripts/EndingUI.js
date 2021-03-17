import { _ } from "./util.js";
import RenderManager from "./RenderManager.js";
import SocketManager from "./SocketManager.js";

export default class EndingUI {
  constructor(boardContainer) {
    this.$boardContainer = boardContainer;
  }
  
  makeTemplate(){
      return `<div class="changeable-area">
      <section class="board-wrap__text">
        <div class="board-wrap__text__name">______님은,,</div>
        <div>저희와 함께 하차하실 수 없습니다,,( ͡° ͜ʖ ͡°)</div>
      </section>
      <section class="board-wrap__result">
        <div class="board-wrap__result__text">
          <span class="board-wrap__result__text__bet">___의 </span>
          <span class="board-wrap__result__text__user"
            >주인공은 Daisy 👻</span
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
    </div>`
  }
