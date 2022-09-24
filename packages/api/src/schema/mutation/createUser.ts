import { builder } from '../../builder'
import { prisma } from '../../db'
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
    resolve: async (query, _, { user }) =>
      prisma.user.create({
        ...query,
        data: {
          name: user.name,
          email: user.email,
          passwordHash: await bcrypt.hash(user.password, 10),
        },
      }),
  })
)
