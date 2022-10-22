import { builder } from '../../builder'
import { prisma } from '../../database'
import { hash } from 'bcrypt'

const UpdateUserInput = builder.inputType('UpdateUserInput', {
  fields: (t) => ({
    name: t.string({
      validate: {
        type: 'string',
        minLength: 1,
      },
    }),
    password: t.string({
      validate: {
        type: 'string',
        minLength: 8,
      },
    }),
    customFields: t.field({ type: 'Json' }),
  }),
})

builder.mutationField('updateUser', (t) =>
  t
    .withAuth({
      authenticated: true,
    })
    .prismaField({
      type: 'User',
      nullable: true,
      errors: {},
      args: {
        user: t.arg({ type: UpdateUserInput, required: true }),
      },
      resolve: async (query, _parent, args, ctx) => {
        let customFields = args.user.customFields ?? undefined
        if (customFields != null) {
          const user = await prisma.user.findUnique({
            select: {
              customFields: true,
            },
            where: {
              id: ctx.userId,
            },
          })
          if (typeof user?.customFields === 'object') {
            customFields = { ...user.customFields, ...customFields }
          }
        }

        return prisma.user.update({
          ...query,
          data: {
            name: args.user.name ?? undefined,
            passwordHash: args.user.password == null ? undefined : await hash(args.user.password, 10),
            customFields,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })
)
