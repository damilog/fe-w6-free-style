export default class SocketManager {
  constructor() {
    this.socket = io();
  }

  onSocket(evt, fn) {
    this.socket.on(evt, count => {
      console.log("현재 인원", count);
      fn(count);
    });
  }
}
