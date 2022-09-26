import { builder } from '../builder'

builder.prismaObject('Coupon', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    code: t.exposeString('code'),
    discountPercentage: t.exposeInt('discountPercentage', { nullable: true }),
    discountValue: t.exposeInt('discountValue', { nullable: true }),
    quantity: t.exposeInt('quantity', { nullable: true }),
    validFrom: t.expose('validFrom', { type: 'DateTime', nullable: true }),
    validTo: t.expose('validTo', { type: 'DateTime', nullable: true }),
    expiresAt: t.expose('expiresAt', { type: 'DateTime', nullable: true }),
    organisationId: t.exposeInt('organisationId'),
    spaceId: t.exposeInt('spaceId', { nullable: true }),
    slotId: t.exposeInt('slotId', { nullable: true }),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    organisation: t.relation('organisation'),
    space: t.relation('space', { nullable: true }),
    slot: t.relation('slot', { nullable: true }),
    bookings: t.relation('bookings'),
  }),
})
