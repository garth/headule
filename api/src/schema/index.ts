import './error'

import './booking'
import './bookingOption'
import './bookingSlot'
import './coupon'
import './option'
import './organisation'
import './organisationUser'
import './slot'
import './space'
import './unavailable'
import './user'

import './query'
import './mutation'

import { builder } from '../builder'

export const schema = builder.toSchema()
