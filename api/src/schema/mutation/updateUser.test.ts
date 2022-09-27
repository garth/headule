import { expect, describe, it, beforeAll, afterEach } from 'vitest'
import { server } from '../../server'
import request from 'supertest'
import { getToken } from '../query/user.test'
import { prisma } from '../../database'
import { seedUsers } from '../../../prisma/seedUsers'

describe('updateUser', () => {
  let token: string | null = null
  beforeAll(async () => {
    token = await getToken('garth@test.com', 'password')
  })

  afterEach(async () => {
    // await prisma.$queryRaw`DELETE FROM user`
    await prisma.user.deleteMany()
    await seedUsers(prisma)
  })

  it('should update the user', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        mutation {
          updateUser(user: {name: "Brad"}) {
            __typename
            ... on ApiError {
              code
              message
            }
            ... on MutationUpdateUserSuccess {
              data {
                name
              }
            }
          }
        }
        `,
      })

    expect(response.status).toBe(200)
    expect(response.body.data.updateUser.__typename).toBe('MutationUpdateUserSuccess')
    expect(response.body.data.updateUser.data.name).toBe('Brad')
  })

  it.todo('should add custom fields', async () => {
    const response = await request(server)
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        mutation ($json: Json!) {
          updateUser(user: {customFields: $json}) {
            __typename
            ... on ApiError {
              code
              message
            }
            ... on MutationUpdateUserSuccess {
              data {
                customFields
              }
            }
          }
        }
        `,
        variables: {
          json: JSON.stringify({ new: 'field' }),
        },
      })

    console.log(response.body.errors[0])

    expect(response.status).toBe(200)
    expect(response.body.data.updateUser.__typename).toBe('MutationUpdateUserSuccess')
    expect(response.body.data.updateUser.data).toBe({
      customFields: {
        test: 'field',
        new: 'field',
      },
    })
  })
})
