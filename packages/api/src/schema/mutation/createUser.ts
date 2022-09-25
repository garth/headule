import { builder } from '../../builder'
import { prisma } from '../../database'
import bcrypt from 'bcrypt'

const CreateUserInput = builder.inputType('CreateUserInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
})

builder.mutationField('createUser', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      user: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, _parent, args) =>
      prisma.user.create({
        ...query,
        data: {
          name: args.user.name,
          email: args.user.email,
          passwordHash: await bcrypt.hash(args.user.password, 10),
        },
      }),
  })
)
