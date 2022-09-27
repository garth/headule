import { builder } from '../../builder'
import { prisma } from '../../database'
import { parseId } from '../../utils'

builder.queryField('user', (t) =>
  t
    .withAuth({
      authenticated: true,
    })
    .prismaField({
      type: 'User',
      nullable: true,
      args: {
        userId: t.arg.id(),
      },
      resolve: (query, _parent, args, ctx) =>
        prisma.user.findUnique({
          ...query,
          where: {
            id: parseId(args.userId ?? ctx.userId),
          },
        }),
    })
)
