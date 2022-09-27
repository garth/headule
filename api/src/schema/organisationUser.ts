import { builder } from '../builder'

builder.prismaObject('OrganisationUser', {
  fields: (t) => ({
    id: t.exposeID('id'),
    organisationId: t.exposeID('organisationId'),
    userId: t.exposeID('userId'),
    role: t.exposeString('role'),

    organisation: t.relation('organisation'),
    user: t.relation('user'),
  }),
})
