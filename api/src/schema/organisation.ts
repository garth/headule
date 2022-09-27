import { builder } from '../builder'

builder.prismaObject('Organisation', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    spaces: t.relation('spaces'),
    unavailables: t.relation('unavailables'),
    options: t.relation('options'),
    coupons: t.relation('coupons'),
    organisationUsers: t.relation('organisationUsers'),
  }),
})
