export enum ErrorCode {
  EMAIL_IN_USE = 'EMAIL_IN_USE',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
}

export class ApiError extends Error {
  public code: ErrorCode
  constructor(code: ErrorCode, message: string) {
    super(message)
    this.code = code
  }
}
