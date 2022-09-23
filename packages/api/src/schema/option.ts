import { builder } from '../builder'

builder.prismaObject('Option', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    unitPrice: t.exposeInt('unitPrice'),
    maxUnits: t.exposeInt('maxUnits'),
    organisationId: t.exposeInt('organisationId'),
    spaceId: t.exposeInt('spaceId', { nullable: true }),
    slotId: t.exposeInt('slotId', { nullable: true }),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    organisation: t.relation('organisation'),
    space: t.relation('space', { nullable: true }),
    slot: t.relation('slot', { nullable: true }),
    bookingOptions: t.relation('bookingOptions'),
  }),
})
