import type { Prisma, PrismaClient } from '../generated/prisma/client'
import { hashSync } from 'bcrypt'

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Garth',
    email: 'garth@test.com',
    passwordHash: hashSync('password', 10),
    emailVerified: true,
    customFields: {
      test: 'field',
    },
  },
  {
    name: 'Nikos',
    email: 'nikos@test.com',
    passwordHash: hashSync('password', 10),
    emailVerified: true,
  },
]

export const seedUsers = (prisma: PrismaClient) => Promise.all(userData.map((data) => prisma.user.create({ data })))
