module.exports = class CustomException extends Error {
  constructor({ title, status, data }) {
    super();
    this.title = title;
    this.data = data;
    this.status = status;
  }
};
