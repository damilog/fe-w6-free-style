export default class SocketManager {
  constructor() {
    this.socket = io();
  }

  onSocket(evt, fn) {
    this.socket.on(evt, count => {
      fn(count);
    });
  }
}
