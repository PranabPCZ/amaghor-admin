import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with test users...')

  // Create test users with different roles
  const testUsers = [
    {
      name: 'John Doe',
      email: 'admin@amaghor.com',
      password: 'password123',
      role: 'owner',
    },
    {
      name: 'Jane Manager',
      email: 'manager@amaghor.com', 
      password: 'password123',
      role: 'manager',
    },
    {
      name: 'Bob Receptionist',
      email: 'receptionist@amaghor.com',
      password: 'password123', 
      role: 'receptionist',
    },
    {
      name: 'Alice Accountant',
      email: 'accountant@amaghor.com',
      password: 'password123',
      role: 'accountant',
    }
  ]

  for (const userData of testUsers) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (existingUser) {
      console.log(`⏭️  User ${userData.email} already exists, skipping...`)
      continue
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      }
    })

    console.log(`✅ Created user: ${user.name} (${user.email}) - Role: ${user.role}`)
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
