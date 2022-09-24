import './booking'
import './bookingOption'
import './bookingSlot'
import './coupon'
import './error'
import './mutation'
import './option'
import './organisation'
import './organisationUser'
import './query'
import './slot'
import './space'
import './unavailable'
import './user'

import { builder } from '../builder'

export const schema = builder.toSchema()
