import { createServer } from '@graphql-yoga/node'
import { initContextCache } from '@pothos/core'
import { schema } from './schema'
import jwt from 'jsonwebtoken'
import { prisma } from './database'
import { User } from '../generated/prisma/client'

const JWT_SECRET = process.env.JWT_SECRET

const server = createServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization

    let user: User | null = null
    if (token != null && JWT_SECRET != null) {
      const data = await new Promise<{ userId: number } | null>((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            reject(err)
          } else {
            resolve(decoded as { userId: number })
          }
        })
      })
      if (data?.userId != null) {
        user = await prisma.user.findUnique({
          where: {
            id: data.userId,
          },
        })
      }
    }

    return {
      // Adding this will prevent any issues if you server implementation
      // copies or extends the context object before passing it to your resolvers
      ...initContextCache(),
      user,
    }
  },
})

server.start().catch((error) => {
  console.error(error)
})
