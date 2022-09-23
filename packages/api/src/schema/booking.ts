import { builder } from '../builder'

builder.prismaObject('Booking', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    userId: t.exposeInt('userId'),
    couponId: t.exposeInt('couponId', { nullable: true }),
    couponDiscountPercentage: t.exposeInt('couponDiscountPercentage', { nullable: true }),
    couponDiscountValue: t.exposeInt('couponDiscountValue', { nullable: true }),
    couponSnapshot: t.expose('couponSnapshot', { type: 'Json', nullable: true }),
    customFields: t.expose('customFields', { type: 'Json', nullable: true }),

    user: t.relation('user'),
    coupon: t.relation('coupon'),
    bookingSlots: t.relation('bookingSlots'),
    bookingOptions: t.relation('bookingOptions'),
  }),
})
