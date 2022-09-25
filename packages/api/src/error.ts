export enum ErrorCode {
  EMAIL_IN_USE,
  SIGN_IN_FAILED,
}

export class ErrorWithCode extends Error {
  public code: ErrorCode
  constructor(code: ErrorCode, message: string) {
    super(message)
    this.code = code
  }
}
