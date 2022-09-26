import { builder } from '../builder'
import { ErrorCode, ErrorWithCode } from '../error'

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
