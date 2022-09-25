import { builder } from '../../builder'
import { prisma } from '../../database'
import bcrypt from 'bcrypt'
import { ErrorCode, ErrorWithCode } from '../error'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const SignInInput = builder.inputType('SignInInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
})

const SignInResponse = builder.objectType('SignInResponse', {
  fields: (t) => ({
    user: t.prismaField({
      type: 'User',
      nullable: true,
      resolve: (query, _root, _args, ctx) =>
        ctx.userId == null
          ? null
          : prisma.user.findUnique({
              ...query,
              where: {
                id: ctx.userId,
              },
            }),
    }),
    token: t.string({
      nullable: true,
      resolve: async (_root, _args, ctx) =>
        new Promise<string | null>((resolve, reject) => {
          if (JWT_SECRET != null && ctx.userId != null) {
            jwt.sign({ userId: ctx.userId }, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
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
  }),
})

builder.mutationField('signIn', (t) =>
  t.field({
    type: SignInResponse,
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
        // add the user to the context
        ctx.userId = user.id

        return {
          user: null,
          token: null,
        }
      } else {
        throw new ErrorWithCode(ErrorCode.SIGN_IN_FAILED, 'Invalid email or password')
      }
    },
  })
)
