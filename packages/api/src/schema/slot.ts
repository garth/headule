import { builder } from '../builder'

builder.prismaObject('Slot', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    startTime: t.exposeInt('startTime'),
    length: t.exposeInt('length'),
    daysOfWeek: t.exposeIntList('daysOfWeek'),
    daysOfMonth: t.exposeIntList('daysOfMonth'),
    spaceId: t.exposeInt('spaceId'),
    blockLength: t.exposeInt('blockLength'),
    blockPrice: t.exposeInt('blockPrice'),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    space: t.relation('space'),
    bookingSlots: t.relation('bookingSlots'),
    options: t.relation('options'),
    coupons: t.relation('coupons'),
  }),
})
