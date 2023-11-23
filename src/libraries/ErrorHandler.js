export const statusCodes = {
  OK: 200,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
};

export default class ApiError extends Error {
  constructor(messege, statusCode) {
    super(messege);
    this.statusCode = statusCode;
  }
}
