import { _ } from "./util.js";
export default class JSONManager {
  constructor() {
    this.server = "http://localhost:3000";
    this.stationList;
  }

  requestData(url) {
    return fetch(`${this.server}/${url}`).then(res => res.json());
  }

  parseByLines(data) {
    const stationList = {};

    //이 코드점 살려주세요..-----
    data.forEach(x => {
      const currentLine = x["line_num"];
      stationList[currentLine] = [];
    });

    data.forEach(x => {
      const currentLine = x["line_num"];
      const currentStation = x["station_nm"];
      stationList[currentLine].push(currentStation);
    });
    //이 코드점 살려주세요..----

    return stationList;
  }
}
// 내가 원하는 형태
// const obj = {01호선 : [시청, 서울역...],
// 02호선 :[시청, 신드림...]
// } -> 이렇게 되면 호선별로 역이 몇개있는지 파악가능.
