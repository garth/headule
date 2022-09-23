import { builder } from '../builder'

builder.prismaObject('OrganisationUser', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    organisationId: t.exposeInt('organisationId'),
    userId: t.exposeInt('userId'),
    roles: t.exposeStringList('roles'),

    organisation: t.relation('organisation'),
    user: t.relation('user'),
  }),
})
