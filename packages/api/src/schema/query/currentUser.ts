import { builder } from '../../builder'
import { prisma } from '../../database'

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    resolve: (query, _parent, _args, ctx) =>
      ctx.userId == null
        ? null
        : prisma.user.findUnique({
            ...query,
            where: {
              id: ctx.userId,
            },
          }),
  })
)
