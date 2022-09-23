import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import PrismaUtilsPlugin from '@pothos/plugin-prisma-utils'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ValidationPlugin from '@pothos/plugin-validation'
import { prisma } from './db'
import type PrismaTypes from '../generated/pothos-types'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    DateTime: {
      Output: Date
      Input: Date
    }
    Json: {
      Output: any
      Input: string
    }
  }
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin, PrismaUtilsPlugin, ValidationPlugin],
  authScopes: () => ({}),
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: true,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
})

builder.queryType()
builder.mutationType()

builder.addScalarType('DateTime', DateTimeResolver, {})
builder.addScalarType('Json', JSONResolver, {})
