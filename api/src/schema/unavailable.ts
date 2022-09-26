import { builder } from '../builder'

builder.prismaObject('Unavailable', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    reason: t.exposeString('reason'),
    organisationId: t.exposeInt('organisationId'),
    spaceId: t.exposeInt('spaceId', { nullable: true }),
    startTime: t.expose('startTime', { type: 'DateTime' }),
    endTime: t.expose('endTime', { type: 'DateTime' }),

    organisation: t.relation('organisation'),
    space: t.relation('space', { nullable: true }),
  }),
})
