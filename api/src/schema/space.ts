import { builder } from '../builder'

builder.prismaObject('Space', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    organisationId: t.exposeInt('organisationId'),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    organisation: t.relation('organisation'),
    slots: t.relation('slots'),
    unavailables: t.relation('unavailables'),
    options: t.relation('options'),
    coupons: t.relation('coupons'),
  }),
})
