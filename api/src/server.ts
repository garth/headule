import { createServer } from '@graphql-yoga/node'
import { initContextCache } from '@pothos/core'
import { schema } from './schema'
import { verify } from 'jsonwebtoken'
import { ApiError, ErrorCode } from './apiError'

const JWT_SECRET = process.env.JWT_SECRET

const port = parseInt(process.env.PORT ?? '3000', 10)
export const server = createServer({
  port,
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization

    let userId: number | null = null
    if (token != null && JWT_SECRET != null && token.startsWith('Bearer ')) {
      try {
        const data = await new Promise<{ userId: number } | null>((resolve, reject) => {
          verify(token.slice(7), JWT_SECRET, (err, decoded) => {
            if (err) {
              reject(err)
            } else {
              resolve(decoded as { userId: number })
            }
          })
        })
        userId = data?.userId ?? null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Invalid security token', err.message)
        throw new ApiError(ErrorCode.INVALID_TOKEN, 'Invalid security token')
      }
    }

    return {
      // Adding this will prevent any issues if you server implementation
      // copies or extends the context object before passing it to your resolvers
      ...initContextCache(),
      userId,
    }
  },
})
