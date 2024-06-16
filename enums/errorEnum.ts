export enum ErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum ErrorMessage {
  BadRequest = "Bad Request",
  Unauthorized = "Unauthorized",
  Forbidden = "Forbidden",
  NotFound = "Not Found",
  InternalServerError = "Internal Server Error",
  ServiceUnavailable = "Service Unavailable",
}
