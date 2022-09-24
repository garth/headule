import { builder } from '../../builder'
import { prisma } from '../../db'

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      userId: t.arg({ type: 'Int', required: true }),
    },
    resolve: (query, _, { userId }) =>
      prisma.user.findUnique({
        ...query,
        where: {
          id: userId,
        },
      }),
  })
)
