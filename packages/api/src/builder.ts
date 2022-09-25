import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import ErrorsPlugin from '@pothos/plugin-errors'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import PrismaUtilsPlugin from '@pothos/plugin-prisma-utils'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ValidationPlugin from '@pothos/plugin-validation'
import { prisma } from './database'
import type PrismaTypes from '../generated/pothos-types'
import { ErrorWithCode } from './schema/error'
import { User } from '../generated/prisma/client'

export const builder = new SchemaBuilder<{
  Context: {
    userId: number | null
  }
  PrismaTypes: PrismaTypes
  Scalars: {
    DateTime: {
      Output: Date
      Input: Date
    }
    Json: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Output: any
      Input: string
    }
  }
  Objects: {
    SignInResponse: {
      user: User | null
      token: string | null
    }
  }
}>({
  plugins: [ErrorsPlugin, ScopeAuthPlugin, PrismaPlugin, PrismaUtilsPlugin, ValidationPlugin],
  errorOptions: {
    defaultTypes: [ErrorWithCode],
  },
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
