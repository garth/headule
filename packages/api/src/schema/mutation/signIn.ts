import { builder } from '../../builder'
import { prisma } from '../../db'
import bcrypt from 'bcrypt'
import { ErrorCode, ErrorWithCode } from '../error'

const SignInInput = builder.inputType('SignInInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
})

builder.mutationField('signIn', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      user: t.arg({ type: SignInInput, required: true }),
    },
    resolve: async (query, _, args) => {
      const user = await prisma.user.findUnique({
        select: {
          passwordHash: true,
        },
        where: {
          email: args.user.email,
        },
      })

      if (user != null && (await bcrypt.compare(args.user.password, user.passwordHash))) {
        return prisma.user.findUnique({
          ...query,
          where: {
            email: args.user.email,
          },
        })
      } else {
        throw new ErrorWithCode(ErrorCode.SIGN_IN_FAILED, 'Invalid email or password')
      }
    },
  })
)
