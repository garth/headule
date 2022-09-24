import { builder } from '../builder'

export enum ErrorCode {
  EMAIL_IN_USE = 'EMAIL_IN_USE',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
}

export class ErrorWithCode extends Error {
  public code: ErrorCode
  constructor(code: ErrorCode, message: string) {
    super(message)
    this.code = code
  }
}

builder.enumType(ErrorCode, {
  name: 'ErrorCode',
})

builder.objectType(ErrorWithCode, {
  name: 'ErrorWithCode',
  fields: (t) => ({
    code: t.expose('code', { type: ErrorCode }),
    message: t.exposeString('message'),
  }),
})
