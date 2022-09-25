import { builder } from '../../builder'
import { prisma } from '../../database'

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: {
      userId: t.arg({ type: 'Int' }),
    },
    resolve: (query, _parent, args, ctx) =>
      ctx.userId == null
        ? null
        : prisma.user.findUnique({
            ...query,
            where: {
              id: args.userId ?? ctx.userId,
            },
          }),
  })
)
