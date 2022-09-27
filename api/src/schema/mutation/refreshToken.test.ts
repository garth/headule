import { expect, describe, it, beforeAll } from 'vitest'
import { server } from '../../server'
import request from 'supertest'
import { getToken } from '../query/user.test'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

describe('refreshToken', () => {
  let token: string | null = null
  beforeAll(async () => {
    token = await getToken('garth@test.com', 'password')
  })

  it('should return a new token', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        mutation {
          refreshToken {
            __typename
            ... on ApiError {
              code
              message
            }
            ... on MutationRefreshTokenSuccess {
              data {
                token
              }
            }
          }
        }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.data.refreshToken.__typename).toBe('MutationRefreshTokenSuccess')
    const newToken = response.body.data.refreshToken.data.token as string
    const data = await new Promise<{ userId: number } | null>((resolve, reject) => {
      verify(newToken, JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded as { userId: number })
        }
      })
    })
    expect(typeof data?.userId).toBe('number')
  })

  it('should fail with an invalid token', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer invalid`)
      .send({
        query: `
        mutation {
          refreshToken {
            __typename
            ... on ApiError {
              code
              message
            }
            ... on MutationRefreshTokenSuccess {
              data {
                token
              }
            }
          }
        }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.errors.length).toBe(1)
  })

  it('should fail with a missing token', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
        mutation {
          refreshToken {
            __typename
            ... on ApiError {
              code
              message
            }
            ... on MutationRefreshTokenSuccess {
              data {
                token
              }
            }
          }
        }
        `,
      })

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.errors.length).toBe(1)
  })
})
