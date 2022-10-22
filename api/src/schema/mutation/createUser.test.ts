import { expect, describe, it, beforeEach, afterAll } from 'vitest'
import { server } from '../../server'
import request from 'supertest'
import { prisma } from '../../database'
import { seedUsers } from '../../../prisma/seedUsers'

describe('createUser', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await seedUsers(prisma)
  })

  it('should create a user', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `
        mutation ($user: CreateUserInput!) {
          createUser(user:$user) {
            __typename
            ... on ApiError {
              code
              message
            }
            ... on MutationCreateUserSuccess {
              data {
                id
                name
              }
            }
          }
        }
        `,
        variables: {
          user: {
            name: 'Brad',
            email: 'brad@test.com',
            password: 'testPassword',
          },
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.data.createUser.__typename).toBe('MutationCreateUserSuccess')
    expect(response.body.data.createUser.data.id.length).toBeGreaterThan(0)
    expect(response.body.data.createUser.data.name).toBe('Brad')
  })
})
