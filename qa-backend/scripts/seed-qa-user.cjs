require('dotenv/config')

const { PrismaClient, QaUserRole } = require('@prisma/client')
const { randomBytes, scryptSync } = require('node:crypto')

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(password, salt, 64).toString('hex')
  return `scrypt:${salt}:${derived}`
}

async function main() {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL,
  })

  const email = (process.env.QA_SEED_EMAIL || 'qa@maritribe.test').trim().toLowerCase()
  const password = process.env.QA_SEED_PASSWORD || 'review123'
  const name = (process.env.QA_SEED_NAME || 'QA Reviewer').trim()
  const role =
    process.env.QA_SEED_ROLE === 'QA_ADMIN'
      ? QaUserRole.QA_ADMIN
      : QaUserRole.QA_REVIEWER

  const passwordHash = hashPassword(password)

  await prisma.qaUser.upsert({
    where: { email },
    update: {
      name,
      role,
      isActive: true,
      passwordHash,
    },
    create: {
      email,
      name,
      role,
      isActive: true,
      passwordHash,
    },
  })

  await prisma.$disconnect()
  console.log(`Seeded QA user: ${email}`)
}

main().catch(async (error) => {
  console.error(error)
  process.exitCode = 1
})
