export class ServerException extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message);
  }
}

export class NotFoundException extends ServerException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedException extends ServerException {
  constructor(message: string) {
    super(message, 401);
  }
}

export class BadRequestException extends ServerException {
  constructor(message: string) {
    super(message, 400);
  }
}

export class ForbiddenException extends ServerException {
  constructor(message: string) {
    super(message, 403);
  }
}
