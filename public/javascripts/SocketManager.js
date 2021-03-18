export default class SocketManager {
  constructor() {
    this.socket = io();
  }

  onData(evt, fn) {
    this.socket.on(evt, value => {
      fn(value);
    });
  }

  emitData(evt, data) {
    this.socket.emit(evt, data);
  }
}
