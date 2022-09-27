export enum ErrorCode {
  EMAIL_IN_USE = 'EMAIL_IN_USE',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
}

export class ApiError extends Error {
  public code: ErrorCode
  constructor(code: ErrorCode, message: string) {
    super(message)
    this.code = code
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message,
    }
  }
  get stack() {
    return undefined
  }
}
