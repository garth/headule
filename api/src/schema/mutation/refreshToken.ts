import { builder } from '../../builder'
import jwt from 'jsonwebtoken'
import { jwtOptions } from './getToken'

const JWT_SECRET = process.env.JWT_SECRET

builder.mutationField('refreshToken', (t) =>
  t.field({
    type: 'TokenResponse',
    errors: {},
    nullable: true,
    resolve: async (_root, _args, ctx) => ({
      token: await new Promise<string | null>((resolve, reject) => {
        if (JWT_SECRET != null && ctx.userId != null) {
          jwt.sign({ userId: ctx.userId }, JWT_SECRET, jwtOptions, (err, token) => {
            if (err) {
              reject(err)
            } else {
              resolve(token ?? null)
            }
          })
        } else {
          resolve(null)
        }
      }),
    }),
  })
)
