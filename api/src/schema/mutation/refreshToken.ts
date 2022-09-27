import { builder } from '../../builder'
import { sign } from 'jsonwebtoken'
import { jwtOptions } from './getToken'

const JWT_SECRET = process.env.JWT_SECRET

builder.mutationField('refreshToken', (t) =>
  t
    .withAuth({
      authenticated: true,
    })
    .field({
      type: 'Token',
      errors: {},
      nullable: true,
      resolve: async (_root, _args, ctx) => ({
        token: await new Promise<string | null>((resolve, reject) => {
          if (JWT_SECRET != null) {
            sign({ userId: ctx.userId }, JWT_SECRET, jwtOptions, (err, token) => {
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
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      }),
    })
)
