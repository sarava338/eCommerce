export default class ApiError extends Error {
  constructor(messege, statusCode) {
    super(messege);
    this.statusCode = statusCode;
  }
}
