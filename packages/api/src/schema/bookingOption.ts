import { builder } from '../builder'

builder.prismaObject('BookingOption', {
  fields: (t) => ({
    bookingId: t.exposeInt('bookingId'),
    optionId: t.exposeInt('optionId'),
    quantity: t.exposeInt('quantity'),
    unitPrice: t.exposeInt('unitPrice'),
    optionSnapshot: t.expose('optionSnapshot', { type: 'Json' }),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    booking: t.relation('booking'),
    option: t.relation('option'),
  }),
})
