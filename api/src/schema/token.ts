import { builder } from '../builder'

builder.objectType('Token', {
  fields: (t) => ({
    token: t.exposeString('token', { nullable: true }),
    expires: t.expose('expires', { type: 'DateTime' }),
  }),
})
