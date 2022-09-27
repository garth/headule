import { builder } from '../../builder'
import { prisma } from '../../database'
import { hash } from 'bcrypt'

const CreateUserInput = builder.inputType('CreateUserInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    email: t.string({
      required: true,
      validate: {
        type: 'string',
        email: true,
      },
    }),
    password: t.string({
      required: true,
      validate: {
        type: 'string',
        minLength: 8,
      },
    }),
  }),
})

builder.mutationField('createUser', (t) =>
  t
    .withAuth({
      anonymous: true,
    })
    .prismaField({
      type: 'User',
      nullable: true,
      errors: {},
      args: {
        user: t.arg({ type: CreateUserInput, required: true }),
      },
      resolve: async (query, _parent, args) =>
        prisma.user.create({
          ...query,
          data: {
            name: args.user.name,
            email: args.user.email,
            passwordHash: await hash(args.user.password, 10),
          },
        }),
    })
)
