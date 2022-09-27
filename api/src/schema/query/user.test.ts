import { expect, describe, it, beforeAll } from 'vitest'
import { server } from '../../server'
import request from 'supertest'

export const getToken = async (email: string, password: string): Promise<string> => {
  const response = await request(server)
    .post('/graphql')
    .send({
      query: `
        mutation ($email: String!, $password: String!) {
          getToken(user: {email: $email, password: $password}) {
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
      variables: { email, password },
    })
  return response.body.data.getToken.data.token as string
}

describe('user', () => {
  let token: string | null = null
  beforeAll(async () => {
    token = await getToken('garth@test.com', 'password')
  })

  it('should return the current user', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          {
            user {
              id
              email
              name
            }
          }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.data.user).toEqual({
      id: '1',
      email: 'garth@test.com',
      name: 'Garth',
    })
  })
})
