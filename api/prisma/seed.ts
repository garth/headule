import { PrismaClient } from '../generated/prisma/client'
import { seedUsers } from './seedUsers'

const prisma = new PrismaClient()

const main = async () => {
  await seedUsers(prisma)
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
