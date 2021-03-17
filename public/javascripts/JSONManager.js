import { _ } from "./util.js";
export default class JSONManager {
  constructor() {
    this.server = "http://localhost:3000";
    this.stationList;
    this.responseData;
  }

  requestData(url) {
    return fetch(`${this.server}/${url}`).then(res => res.json());
  }

  parseByLines(data) {
    const stationList = {};
    data.forEach(x => {
      const currentLine = x["line_num"];
      stationList[currentLine] = [];
    });

    data.forEach(x => {
      const currentLine = x["line_num"];
      const currentStation = x["station_nm"];
      stationList[currentLine].push(currentStation);
    });

    return stationList;
  }
}
