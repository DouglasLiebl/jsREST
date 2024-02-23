export default class StandardError {
  constructor(status, method, path, messages) {
    this.timestamp = new Date();
    this.status = status;
    this.path = `${method}: ${path}`;
    this.messages = messages;
  }
}
