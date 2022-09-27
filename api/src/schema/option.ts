import { builder } from '../builder'

builder.prismaObject('Option', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    unitPrice: t.exposeInt('unitPrice'),
    maxUnits: t.exposeInt('maxUnits'),
    organisationId: t.exposeID('organisationId'),
    spaceId: t.exposeID('spaceId', { nullable: true }),
    slotId: t.exposeID('slotId', { nullable: true }),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    organisation: t.relation('organisation'),
    space: t.relation('space', { nullable: true }),
    slot: t.relation('slot', { nullable: true }),
    bookingOptions: t.relation('bookingOptions'),
  }),
})
