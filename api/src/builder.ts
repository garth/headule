import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import ErrorsPlugin from '@pothos/plugin-errors'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
// import PrismaUtilsPlugin from '@pothos/plugin-prisma-utils'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ValidationPlugin from '@pothos/plugin-validation'
import { prisma } from './database'
import type PrismaTypes from '../generated/pothos-types'
import { ApiError, ErrorCode } from './apiError'

type Context = {
  userId: number | null
}

export const builder = new SchemaBuilder<{
  AuthScopes: {
    authenticated: boolean
    anonymous: boolean
  }
  Context: Context
  AuthContexts: {
    authenticated: {
      userId: number
    }
    anonymous: Context
  }
  PrismaTypes: PrismaTypes
  Scalars: {
    ID: {
      Output: number | string
      Input: string
    }
    DateTime: {
      Input: Date
      Output: Date
    }
    Json: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Input: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Output: any
    }
  }
  Objects: {
    Token: {
      token: string | null
      expires: Date
    }
  }
}>({
  plugins: [ScopeAuthPlugin, ErrorsPlugin, ValidationPlugin, PrismaPlugin], //, PrismaUtilsPlugin],
  authScopes: (ctx) => ({
    authenticated: ctx.userId != null,
    anonymous: ctx.userId == null,
  }),
  scopeAuthOptions: {
    unauthorizedError: () => new ApiError(ErrorCode.UNAUTHORIZED, `Not authorized`),
  },
  errorOptions: {
    defaultTypes: [ApiError],
  },
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
