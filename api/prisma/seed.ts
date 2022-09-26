import { PrismaClient, Prisma } from '../generated/prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Garth',
    email: 'garth@test.com',
    passwordHash: bcrypt.hashSync('password', 10),
    emailVerified: true,
  },
  {
    name: 'Nikos',
    email: 'nikos@test.com',
    passwordHash: bcrypt.hashSync('password', 10),
    emailVerified: true,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
