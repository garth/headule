import { builder } from '../builder'

builder.prismaObject('BookingSlot', {
  fields: (t) => ({
    bookingId: t.exposeInt('bookingId'),
    slotId: t.exposeInt('slotId'),
    startTime: t.expose('startTime', { type: 'DateTime' }),
    length: t.exposeInt('length'),
    slotBlockPrice: t.exposeInt('slotBlockPrice'),
    slotBlockQuantity: t.exposeInt('slotBlockQuantity'),
    slotSnapshot: t.expose('slotSnapshot', { type: 'Json' }),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    booking: t.relation('booking'),
    slot: t.relation('slot'),
  }),
})
