import { builder } from '../builder'

builder.prismaObject('Unavailable', {
  fields: (t) => ({
    id: t.exposeID('id'),
    reason: t.exposeString('reason'),
    organisationId: t.exposeID('organisationId'),
    spaceId: t.exposeID('spaceId', { nullable: true }),
    startTime: t.expose('startTime', { type: 'DateTime' }),
    endTime: t.expose('endTime', { type: 'DateTime' }),

    organisation: t.relation('organisation'),
    space: t.relation('space', { nullable: true }),
  }),
})
