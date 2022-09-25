import { builder } from '../../builder'
import { prisma } from '../../database'
import bcrypt from 'bcrypt'
import { ErrorCode, ErrorWithCode } from '../../error'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const jwtOptions: jwt.SignOptions = { expiresIn: '1d' }

const SignInInput = builder.inputType('SignInInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
})

builder.objectType('TokenResponse', {})

builder.mutationField('getToken', (t) =>
  t.field({
    type: 'TokenResponse',
    nullable: true,
    args: {
      user: t.arg({ type: SignInInput, required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          passwordHash: true,
        },
        where: {
          email: args.user.email,
        },
      })

      if (user != null && (await bcrypt.compare(args.user.password, user.passwordHash))) {
        // add the user to the context for other resolvers
        ctx.userId = user.id

        return {
          token: await new Promise<string | null>((resolve, reject) => {
            if (JWT_SECRET != null && user.id != null) {
              jwt.sign({ userId: user.id }, JWT_SECRET, jwtOptions, (err, token) => {
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
        }
      } else {
        throw new ErrorWithCode(ErrorCode.SIGN_IN_FAILED, 'Invalid email or password')
      }
    },
  })
)
