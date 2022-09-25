import { builder } from '../../builder'
import { prisma } from '../../database'

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      userId: t.arg({ type: 'Int', required: true }),
    },
    resolve: (query, _parent, args) =>
      prisma.user.findUnique({
        ...query,
        where: {
          id: args.userId,
        },
      }),
  })
)
