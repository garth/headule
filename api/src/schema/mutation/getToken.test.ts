import { expect, describe, it } from 'vitest'
import { server } from '../../server'
import request from 'supertest'
import { ErrorCode } from '../../apiError'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? ''

describe('getToken', () => {
  it('should return a login token', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
          mutation {
            getToken(user: {email: "garth@test.com", password: "password"}) {
              __typename
              ... on ApiError {
                code
                message
              }
              ... on MutationGetTokenSuccess {
                data {
                  token
                  expires
                }
              }
            }
          }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.data.getToken.__typename).toBe('MutationGetTokenSuccess')
    const token = response.body.data.getToken.data.token as string
    const data = await new Promise<{ userId: number } | null>((resolve, reject) => {
      verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded as { userId: number })
        }
      })
    })
    expect(typeof data?.userId).toBe('number')
    expect(typeof response.body.data.getToken.data.expires).toBe('string')
  })

  it('should fail for invalid emails', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
          mutation {
            getToken(user: {email: "invalid@test.com", password: "password"}) {
              __typename
              ... on ApiError {
                code
                message
              }
              ... on MutationGetTokenSuccess {
                data {
                  token
                }
              }
            }
          }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.data.getToken.__typename).toBe('ApiError')
    expect(response.body.data.getToken.code).toBe(ErrorCode.SIGN_IN_FAILED)
  })

  it('should fail for invalid password', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
          mutation {
            getToken(user: {email: "garth@test.com", password: "invalid"}) {
              __typename
              ... on ApiError {
                code
                message
              }
              ... on MutationGetTokenSuccess {
                data {
                  token
                }
              }
            }
          }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.data.getToken.__typename).toBe('ApiError')
    expect(response.body.data.getToken.code).toBe(ErrorCode.SIGN_IN_FAILED)
  })
})
