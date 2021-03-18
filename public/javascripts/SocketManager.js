export default class SocketManager {
  constructor() {
    this.socket = io();
  }

  onSocket(evt, fn) {
    this.socket.on(evt, value => {
      fn(value);
    });
  }

  emitSocket(evt, fn) {
    this.socket.emit(evt, value => {
      fn(value);
    });
  }
}
