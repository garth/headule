import { builder } from '../builder'
import { ErrorCode, ApiError } from '../apiError'

builder.enumType(ErrorCode, {
  name: 'ErrorCode',
})

builder.objectType(ApiError, {
  name: 'ApiError',
  fields: (t) => ({
    code: t.expose('code', { type: ErrorCode }),
    message: t.exposeString('message'),
  }),
})
