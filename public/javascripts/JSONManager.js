import { _ } from "./util.js";
export default class JSONManager {
  constructor() {
    this.server = "http://localhost:3000";
  }

  async request(url) {
    const response = await fetch(`${this.server}/${url}`);
    console.log(response.json());
  }

  parseBySubwayLines(data) {}
}
